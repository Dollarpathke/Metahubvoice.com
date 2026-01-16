const mongoose = require('mongoose');

// Use mock database if enabled
if (process.env.USE_MOCK_DB === 'true') {
    const mockDb = require('../mockDatabase');
    module.exports = mockDb.Purchase;
    return;
}

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    paymentMethod: {
        type: String,
        enum: ['paypal', 'paypal-manual', 'stripe', 'card'],
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    transactionId: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'approved', 'rejected', 'failed', 'refunded'],
        default: 'pending'
    },
    verifiedAt: {
        type: Date
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectedAt: {
        type: Date
    },
    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectionReason: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Index for faster queries
purchaseSchema.index({ user: 1, course: 1 });
purchaseSchema.index({ userEmail: 1 });
purchaseSchema.index({ orderId: 1 });
purchaseSchema.index({ status: 1 });

module.exports = mongoose.model('Purchase', purchaseSchema);
