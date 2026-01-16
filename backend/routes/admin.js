// Admin Routes
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');
const { adminAuth } = require('../middleware/auth');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Admin tokens expire in 7 days
    });
};

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Admin privileges required.'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            status: 'success',
            message: 'Admin login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/admin/verify
// @desc    Verify admin token
// @access  Private/Admin
router.get('/verify', adminAuth, async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'Token is valid',
            data: {
                user: {
                    id: req.user._id,
                    email: req.user.email,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    role: req.user.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/admin/stats
// @desc    Get admin statistics
// @access  Private/Admin
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const totalPurchases = await Purchase.countDocuments();
        const pendingApprovals = await Purchase.countDocuments({ status: 'pending' });
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        
        const revenueResult = await Purchase.aggregate([
            { $match: { status: { $in: ['completed', 'approved'] } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Get recent purchases
        const recentPurchases = await Purchase.find()
            .populate('user', 'email firstName lastName')
            .populate('course', 'title price')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            status: 'success',
            data: {
                totalRevenue,
                totalUsers,
                totalAdmins,
                totalPurchases,
                pendingApprovals,
                recentPurchases
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/admin/purchases
// @desc    Get all purchases with filters
// @access  Private/Admin
router.get('/purchases', adminAuth, async (req, res) => {
    try {
        const { status, limit = 50, page = 1 } = req.query;
        const filter = status ? { status } : {};
        
        const purchases = await Purchase.find(filter)
            .populate('user', 'email firstName lastName')
            .populate('course', 'title price')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Purchase.countDocuments(filter);

        res.json({
            status: 'success',
            count: purchases.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: { purchases }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', adminAuth, async (req, res) => {
    try {
        const { role, limit = 50, page = 1 } = req.query;
        const filter = role ? { role } : {};
        
        const users = await User.find(filter)
            .select('-password')
            .populate('purchases')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await User.countDocuments(filter);

        res.json({
            status: 'success',
            count: users.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: { users }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/admin/purchases/:id/approve
// @desc    Approve purchase
// @access  Private/Admin
router.put('/purchases/:id/approve', adminAuth, async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id)
            .populate('course')
            .populate('user');

        if (!purchase) {
            return res.status(404).json({
                status: 'error',
                message: 'Purchase not found'
            });
        }

        purchase.status = 'approved';
        purchase.verifiedAt = new Date();
        purchase.verifiedBy = req.user._id;
        await purchase.save();

        // Send confirmation email if email service is configured
        if (process.env.EMAIL_USER) {
            const { sendPurchaseConfirmation } = require('../utils/emailService');
            await sendPurchaseConfirmation(
                purchase.userEmail,
                purchase.user?.firstName || 'Valued Customer',
                purchase.course?.title || 'Course',
                purchase.orderId
            );
        }

        res.json({
            status: 'success',
            message: 'Purchase approved successfully',
            data: { purchase }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/admin/purchases/:id/reject
// @desc    Reject purchase
// @access  Private/Admin
router.put('/purchases/:id/reject', adminAuth, async (req, res) => {
    try {
        const { reason } = req.body;
        
        const purchase = await Purchase.findById(req.params.id);

        if (!purchase) {
            return res.status(404).json({
                status: 'error',
                message: 'Purchase not found'
            });
        }

        purchase.status = 'rejected';
        purchase.rejectionReason = reason || 'Payment verification failed';
        purchase.rejectedBy = req.user._id;
        purchase.rejectedAt = new Date();
        await purchase.save();

        res.json({
            status: 'success',
            message: 'Purchase rejected',
            data: { purchase }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', adminAuth, async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid role. Must be "user" or "admin"'
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        user.role = role;
        await user.save();

        res.json({
            status: 'success',
            message: `User role updated to ${role}`,
            data: { user: user.toJSON() }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
