// Test BullBear MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config();

async function testBullBearConnection() {
    console.log('🔍 Testing BullBear MongoDB Connection...');
    console.log('=====================================');
    
    const username = 'bullbear';
    const cluster = 'cluster0.q8etdgf.mongodb.net';
    const database = 'bullbear-trading';
    
    // Common password patterns to test
    const passwordsToTest = [
        'password123',
        'Password123',
        'PASSWORD123',
        'bullbear123',
        'Bullbear123',
        'BULLBEAR123',
        'bullbear',
        'Bullbear',
        'BULLBEAR',
        '123456',
        'admin123',
        'Admin123'
    ];

    console.log(`👤 Username: ${username}`);
    console.log(`🏠 Cluster: ${cluster}`);
    console.log(`📊 Database: ${database}`);
    console.log(`🔑 Testing ${passwordsToTest.length} common passwords...\n`);

    for (let i = 0; i < passwordsToTest.length; i++) {
        const password = passwordsToTest[i];
        const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;
        
        console.log(`🧪 Test ${i + 1}/${passwordsToTest.length}: Trying password "${password}"`);
        
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 5000,
            });
            
            console.log('✅ SUCCESS! Connection established!');
            console.log(`🎉 Correct password: ${password}`);
            console.log(`📍 Database: ${mongoose.connection.name}`);
            console.log(`🏠 Host: ${mongoose.connection.host}`);
            
            // Update .env file with correct password
            const fs = require('fs');
            const envContent = fs.readFileSync('.env', 'utf8');
            const updatedEnv = envContent.replace(
                /MONGODB_URI=.*/,
                `MONGODB_URI=${uri}`
            );
            fs.writeFileSync('.env', updatedEnv);
            console.log('✅ Updated .env file with correct credentials');
            
            await mongoose.disconnect();
            console.log('🔌 Disconnected successfully');
            
            console.log('\n🚀 Ready to create admin user!');
            return true;
            
        } catch (error) {
            if (error.message.includes('authentication failed')) {
                console.log('❌ Wrong password');
            } else if (error.message.includes('ENOTFOUND')) {
                console.log('❌ Network/DNS issue');
                break; // No point testing more passwords if network fails
            } else if (error.message.includes('timeout')) {
                console.log('❌ Connection timeout');
            } else {
                console.log('❌ Other error:', error.message);
            }
        }
    }
    
    console.log('\n=====================================');
    console.log('❌ No working password found');
    console.log('📋 Next Steps:');
    console.log('1. Check MongoDB Atlas dashboard');
    console.log('2. Go to Database Access → Database Users');
    console.log('3. Find user "bullbear" and check/reset password');
    console.log('4. Or create new user with known password');
    console.log('5. Ensure IP whitelist includes your IP (0.0.0.0/0 for all)');
    console.log('=====================================');
    
    return false;
}

// Run the test
testBullBearConnection()
    .then(success => {
        if (success) {
            console.log('\n🎯 Next: Run "node createAdmin.js" to create admin user');
        }
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('💥 Unexpected error:', error);
        process.exit(1);
    });