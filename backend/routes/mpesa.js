const express = require('express');
const router = express.Router();
const axios = require('axios');

// M-Pesa Configuration
const MPESA_CONFIG = {
    consumerKey: process.env.MPESA_CONSUMER_KEY || 'YOUR_CONSUMER_KEY',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'YOUR_CONSUMER_SECRET',
    businessShortCode: process.env.MPESA_SHORTCODE || '174379',
    passkey: process.env.MPESA_PASSKEY || 'YOUR_PASSKEY',
    callbackURL: process.env.MPESA_CALLBACK_URL || 'https://yourdomain.com/api/mpesa/callback',
    environment: process.env.MPESA_ENV || 'sandbox' // 'sandbox' or 'production'
};

// Get base URL based on environment
const getBaseURL = () => {
    return MPESA_CONFIG.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';
};

// Generate M-Pesa Access Token
async function getAccessToken() {
    try {
        const auth = Buffer.from(
            `${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`
        ).toString('base64');

        const response = await axios.get(
            `${getBaseURL()}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    Authorization: `Basic ${auth}`
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw new Error('Failed to get M-Pesa access token');
    }
}

// Generate Password for STK Push
function generatePassword(timestamp) {
    const data = MPESA_CONFIG.businessShortCode + MPESA_CONFIG.passkey + timestamp;
    return Buffer.from(data).toString('base64');
}

// Generate Timestamp (YYYYMMDDHHmmss)
function generateTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Initiate STK Push
router.post('/stkpush', async (req, res) => {
    try {
        const { phoneNumber, amount, accountReference, transactionDesc } = req.body;

        // Validate input
        if (!phoneNumber || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and amount are required'
            });
        }

        // Format phone number (remove leading 0, add 254)
        let formattedPhone = phoneNumber.toString().trim();
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('254')) {
            formattedPhone = '254' + formattedPhone;
        }

        // Get access token
        const accessToken = await getAccessToken();
        
        // Generate timestamp and password
        const timestamp = generateTimestamp();
        const password = generatePassword(timestamp);

        // STK Push request payload
        const stkPushData = {
            BusinessShortCode: MPESA_CONFIG.businessShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: MPESA_CONFIG.businessShortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: MPESA_CONFIG.callbackURL,
            AccountReference: accountReference || 'BullBear Subscription',
            TransactionDesc: transactionDesc || 'Indicators Subscription Payment'
        };

        console.log('Initiating STK Push:', {
            phone: formattedPhone,
            amount: amount,
            timestamp: timestamp
        });

        // Make STK Push request
        const response = await axios.post(
            `${getBaseURL()}/mpesa/stkpush/v1/processrequest`,
            stkPushData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('STK Push Response:', response.data);

        res.json({
            success: true,
            message: 'STK Push sent successfully',
            data: {
                MerchantRequestID: response.data.MerchantRequestID,
                CheckoutRequestID: response.data.CheckoutRequestID,
                ResponseCode: response.data.ResponseCode,
                ResponseDescription: response.data.ResponseDescription,
                CustomerMessage: response.data.CustomerMessage
            }
        });

    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to initiate STK Push',
            error: error.response?.data || error.message
        });
    }
});

// M-Pesa Callback URL
router.post('/callback', async (req, res) => {
    try {
        console.log('M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));

        const { Body } = req.body;
        
        if (Body && Body.stkCallback) {
            const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = Body.stkCallback;

            if (ResultCode === 0) {
                // Payment successful
                const callbackMetadata = Body.stkCallback.CallbackMetadata?.Item || [];
                
                const amount = callbackMetadata.find(item => item.Name === 'Amount')?.Value;
                const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
                const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber')?.Value;
                const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate')?.Value;

                console.log('Payment Successful:', {
                    MerchantRequestID,
                    CheckoutRequestID,
                    Amount: amount,
                    Receipt: mpesaReceiptNumber,
                    Phone: phoneNumber,
                    Date: transactionDate
                });

                // TODO: Update database with successful payment
                // TODO: Activate user subscription
                // TODO: Send confirmation email

            } else {
                // Payment failed
                console.log('Payment Failed:', {
                    MerchantRequestID,
                    CheckoutRequestID,
                    ResultCode,
                    ResultDesc
                });
            }
        }

        // Always respond with success to M-Pesa
        res.json({ ResultCode: 0, ResultDesc: 'Success' });

    } catch (error) {
        console.error('Callback Error:', error);
        res.json({ ResultCode: 0, ResultDesc: 'Success' });
    }
});

// Query STK Push Status
router.post('/stkquery', async (req, res) => {
    try {
        const { checkoutRequestID } = req.body;

        if (!checkoutRequestID) {
            return res.status(400).json({
                success: false,
                message: 'CheckoutRequestID is required'
            });
        }

        const accessToken = await getAccessToken();
        const timestamp = generateTimestamp();
        const password = generatePassword(timestamp);

        const queryData = {
            BusinessShortCode: MPESA_CONFIG.businessShortCode,
            Password: password,
            Timestamp: timestamp,
            CheckoutRequestID: checkoutRequestID
        };

        const response = await axios.post(
            `${getBaseURL()}/mpesa/stkpushquery/v1/query`,
            queryData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('STK Query Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to query STK Push status',
            error: error.response?.data || error.message
        });
    }
});

module.exports = router;
