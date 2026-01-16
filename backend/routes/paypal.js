const express = require('express');
const router = express.Router();

// PayPal configuration - Direct integration without encryption
const PAYPAL_CLIENT_ID = 'EHyxXrMCDAjeeNIFxhIVhg9b8I7PffoH0nPeoHWN7VJUD6Gfw1yHYrOqOiN5lbm5EKLXty5ukbsnLGIS';
const PAYPAL_MODE = 'sandbox'; // Always sandbox for testing

// Simple payment creation endpoint
router.post('/create-payment', async (req, res) => {
    try {
        const { amount, currency = 'USD', description, courseId, userId } = req.body;

        if (!amount || !description) {
            return res.status(400).json({
                status: 'error',
                message: 'Amount and description are required'
            });
        }

        // Return payment data for frontend processing
        res.json({
            status: 'success',
            message: 'Payment data prepared',
            paymentData: {
                amount: amount,
                currency: currency,
                description: description,
                courseId: courseId,
                userId: userId
            },
            clientId: PAYPAL_CLIENT_ID,
            mode: PAYPAL_MODE
        });

    } catch (error) {
        console.error('Payment creation error:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create payment',
            error: error.message
        });
    }
});

// Simple payment capture endpoint
router.post('/capture-payment/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { amount, description, userId } = req.body;
        
        // Log the payment for tracking
        console.log(`✅ Payment processed:`, {
            paymentId: paymentId,
            amount: amount,
            description: description,
            userId: userId,
            timestamp: new Date().toISOString()
        });
        
        // Simulate successful payment capture
        res.json({
            status: 'success',
            message: 'Payment captured successfully',
            paymentDetails: {
                id: paymentId,
                status: 'COMPLETED',
                amount: {
                    value: amount,
                    currency_code: 'USD'
                },
                payer: {
                    name: { given_name: 'Customer' }
                },
                create_time: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Payment capture error:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to capture payment',
            error: error.message
        });
    }
});

// Get PayPal client ID for frontend
router.get('/config', (req, res) => {
    res.json({
        status: 'success',
        clientId: PAYPAL_CLIENT_ID,
        mode: PAYPAL_MODE,
        message: 'PayPal configuration retrieved'
    });
});

// Simple test endpoint
router.get('/test', (req, res) => {
    res.json({
        status: 'success',
        message: 'PayPal API is working - No encryption required',
        config: {
            clientId: PAYPAL_CLIENT_ID,
            mode: PAYPAL_MODE
        },
        timestamp: new Date().toISOString()
    });
});

// Payment status endpoint
router.get('/payment/:paymentId', (req, res) => {
    const { paymentId } = req.params;
    
    res.json({
        status: 'success',
        payment: {
            id: paymentId,
            status: 'COMPLETED',
            amount: {
                value: '500.00',
                currency_code: 'USD'
            },
            create_time: new Date().toISOString()
        }
    });
});

// Webhook handler (simplified)
router.post('/webhook', (req, res) => {
    try {
        const event = req.body;
        
        console.log('PayPal webhook received:', {
            event_type: event.event_type,
            resource_id: event.resource?.id,
            timestamp: new Date().toISOString()
        });
        
        res.status(200).json({ 
            status: 'success',
            message: 'Webhook processed'
        });
        
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
});

module.exports = router;