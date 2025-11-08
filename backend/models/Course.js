const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Course title is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    image: {
        type: String
    },
    category: {
        type: String,
        enum: ['crypto', 'forex', 'affiliate-marketing', 'web3', 'trading'],
        default: 'crypto'
    },
    accessUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    features: [{
        type: String
    }],
    duration: {
        type: String
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    totalPurchases: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
