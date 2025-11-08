const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all active courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });
        
        res.json({
            status: 'success',
            count: courses.length,
            data: { courses }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   GET /api/courses/:courseId
// @desc    Get single course
// @access  Public
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findOne({ courseId: req.params.courseId });
        
        if (!course) {
            return res.status(404).json({
                status: 'error',
                message: 'Course not found'
            });
        }

        res.json({
            status: 'success',
            data: { course }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   POST /api/courses
// @desc    Create new course (Admin only)
// @access  Private/Admin
router.post('/', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        
        res.status(201).json({
            status: 'success',
            message: 'Course created successfully',
            data: { course }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @route   PUT /api/courses/:courseId
// @desc    Update course (Admin only)
// @access  Private/Admin
router.put('/:courseId', async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { courseId: req.params.courseId },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!course) {
            return res.status(404).json({
                status: 'error',
                message: 'Course not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Course updated successfully',
            data: { course }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
