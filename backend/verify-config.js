const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

console.log('🔍 Bull Bear Trading - Configuration Verification\n');

// Check environment variables
const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD'
];

const optionalVars = [
    'PAYPAL_CLIENT_ID',
    'PAYPAL_CLIENT_SECRET',
    'EMAIL_HOST',
    'EMAIL_USER'
];

console.log('📋 Required Configuration:');
requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        if (varName === 'MONGODB_URI') {
            const hasPassword = !value.includes('<db_password>');
            console.log(`✅ ${varName}: ${hasPassword ? 'Configured' : '❌ Password needed'}`);
        } else if (varName.includes('PASSWORD') || varName.includes('SECRET')) {
            console.log(`✅ ${varName}: Set (hidden)`);
        } else {
            console.log(`✅ ${varName}: ${value}`);
        }
    } else {
        console.log(`❌ ${varName}: Not set`);
    }
});

console.log('\n📋 Optional Configuration:');
optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== 'your_paypal_secret_key_here') {
        console.log(`✅ ${varName}: Configured`);
    } else {
        console.log(`⚠️  ${varName}: Not configured`);
    }
});

console.log('\n🔗 Connection String Analysis:');
if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI;
    const parts = uri.split('@');
    if (parts.length > 1) {
        const cluster = parts[1].split('/')[0];
        const database = parts[1].split('/')[1]?.split('?')[0];
        console.log(`📍 Cluster: ${cluster}`);
        console.log(`📊 Database: ${database || 'bullbear-trading'}`);
        
        if (uri.includes('<db_password>')) {
            console.log('❌ Password placeholder found - needs actual password');
        } else {
            console.log('✅ Password appears to be set');
        }
    }
}

console.log('\n🎯 Next Steps:');
if (process.env.MONGODB_URI?.includes('<db_password>')) {
    console.log('1. Replace <db_password> with your actual MongoDB Atlas password');
    console.log('2. Run: node test-mongodb.js');
} else {
    console.log('1. Run: node test-mongodb.js');
    console.log('2. Run: node createAdmin.js');
    console.log('3. Run: node seedCourses.js');
    console.log('4. Start server: npm start');
}

console.log('\n💡 Configuration file: backend/.env');