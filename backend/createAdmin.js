// Script to create admin user
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function createAdmin() {
    try {
        // Connect to database
        if (process.env.USE_MOCK_DB !== 'true') {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/metahub-voice');
            console.log('✅ Connected to MongoDB');
        } else {
            console.log('✅ Using Mock Database');
        }

        // Admin details
        const adminData = {
            email: process.env.ADMIN_EMAIL || 'admin@metahubvoice.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@2025!',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            isVerified: true
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            console.log('Email:', existingAdmin.email);
            console.log('Role:', existingAdmin.role);
            
            // Update to admin if not already
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin role');
            }
        } else {
            // Create new admin
            const admin = await User.create(adminData);
            console.log('✅ Admin user created successfully!');
            console.log('\n📧 Admin Credentials:');
            console.log('Email:', adminData.email);
            console.log('Password:', adminData.password);
            console.log('\n⚠️  IMPORTANT: Change the password after first login!');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
}

createAdmin();
