const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');
const User = require('../models/User');

// @route   POST /api/purchases
// @desc    Create new purchase
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { userEmail, courseId, amount, paymentMethod, orderId, transactionId } = req.body;

        // Find course
        const course = await Course.findOne({ courseId });
        if (!course) {
            return res.status(404).json({
                status: 'error',
                message: 'Course not found'
            });
        }

        // Find or create user
        let user = await User.findOne({ email: userEmail });
        if (!user) {
            // Create guest user
            user = await User.create({
                email: userEmail,
                password: Math.random().toString(36).slice(-8) // Temporary password
            });
        }

        // Create purchase
        const purchase = await Purchase.create({
            user: user._id,
            userEmail,
            course: course._id,
            courseId,
            amount,
            paymentMethod,
            orderId,
            transactionId,
            status: paymentMethod === 'paypal-manual' ? 'pending' : 'completed'
        });

        // Update course total purchases
        course.totalPurchases += 1;
        await course.save();

        // Add purchase to user
        user.purchases.push(purchase._id);
        await user.save();

        res.status(201).json({
            status: 'success',
            message: 'Purchase created successfully',
            data: { purchase }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/purchases/user/:email
// @desc    Get user purchases
// @access  Public
router.get('/user/:email', async (req, res) => {
    try {
        const purchases = await Purchase.find({ userEmail: req.params.email })
            .populate('course')
            .sort({ createdAt: -1 });

        res.json({
            status: 'success',
            count: purchases.length,
            data: { purchases }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/purchases/:orderId
// @desc    Get purchase by order ID
// @access  Public
router.get('/:orderId', async (req, res) => {
    try {
        const purchase = await Purchase.findOne({ orderId: req.params.orderId })
            .populate('course')
            .populate('user', '-password');

        if (!purchase) {
            return res.status(404).json({
                status: 'error',
                message: 'Purchase not found'
            });
        }

        res.json({
            status: 'success',
            data: { purchase }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/purchases/:orderId/verify
// @desc    Verify manual payment (Admin only)
// @access  Private/Admin
router.put('/:orderId/verify', async (req, res) => {
    try {
        const purchase = await Purchase.findOne({ orderId: req.params.orderId });

        if (!purchase) {
            return res.status(404).json({
                status: 'error',
                message: 'Purchase not found'
            });
        }

        purchase.status = 'completed';
        purchase.verifiedAt = new Date();
        await purchase.save();

        res.json({
            status: 'success',
            message: 'Purchase verified successfully',
            data: { purchase }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
