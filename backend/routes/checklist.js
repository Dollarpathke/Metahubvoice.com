const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send checklist email
router.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Path to the PDF file
        const pdfPath = path.join(__dirname, '../../crypto-quickstart-checklist.pdf');

        // Check if PDF exists
        if (!fs.existsSync(pdfPath)) {
            console.error('PDF file not found at:', pdfPath);
            return res.status(404).json({
                success: false,
                message: 'Checklist PDF not found'
            });
        }

        // Email options
        const mailOptions = {
            from: `"BullBear Trading" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎉 Your FREE Crypto Quickstart Checklist - BullBear Trading',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #06b6d4; font-size: 28px; margin-bottom: 10px;">Welcome to BullBear Trading! 🚀</h1>
                        <p style="color: #94a3b8; font-size: 16px;">Your Crypto Quickstart Checklist is Ready</p>
                    </div>
                    
                    <div style="background: rgba(99, 102, 241, 0.1); border: 2px solid rgba(99, 102, 241, 0.3); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                            Thank you for signing up! We're excited to help you start your crypto trading journey.
                        </p>
                        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                            Your <strong style="color: #06b6d4;">5-Step Crypto Quickstart Checklist</strong> is attached to this email. 
                            This essential guide will help you:
                        </p>
                        <ul style="color: #94a3b8; font-size: 15px; line-height: 1.8; margin: 15px 0;">
                            <li>Choose the right crypto exchange</li>
                            <li>Secure your digital wallet</li>
                            <li>Research and analyze cryptocurrencies</li>
                            <li>Make your first trade with confidence</li>
                            <li>Track and optimize your portfolio</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://www.bullbeartrading.com" 
                           style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                            Visit BullBear Trading
                        </a>
                    </div>
                    
                    <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 15px; margin: 20px 0; border-radius: 5px;">
                        <p style="color: #06b6d4; font-weight: bold; margin-bottom: 5px;">📞 Your Contact Info:</p>
                        <p style="color: #94a3b8; font-size: 14px; margin: 5px 0;">Email: ${email}</p>
                        ${phone ? `<p style="color: #94a3b8; font-size: 14px; margin: 5px 0;">Phone: ${phone}</p>` : ''}
                    </div>
                    
                    <div style="border-top: 1px solid rgba(99, 102, 241, 0.3); padding-top: 20px; margin-top: 30px; text-align: center;">
                        <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
                            Need help? Reply to this email or visit our website.<br>
                            <a href="https://www.bullbeartrading.com" style="color: #06b6d4; text-decoration: none;">www.bullbeartrading.com</a>
                        </p>
                        <p style="color: #475569; font-size: 12px; margin-top: 15px;">
                            © ${new Date().getFullYear()} BullBear Trading. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'BullBear-Trading-Crypto-Quickstart-Checklist.pdf',
                    path: pdfPath
                }
            ]
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`Checklist email sent to: ${email}`);

        res.json({
            success: true,
            message: 'Checklist email sent successfully'
        });

    } catch (error) {
        console.error('Error sending checklist email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send checklist email',
            error: error.message
        });
    }
});

module.exports = router;
