const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users/:email
// @desc    Get user by email
// @access  Public
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .populate('purchases')
            .select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/users/:email
// @desc    Update user profile
// @access  Private
router.put('/:email', async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { firstName, lastName },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
