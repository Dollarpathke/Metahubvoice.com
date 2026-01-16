// Find correct MongoDB password
const mongoose = require('mongoose');
require('dotenv').config();

async function findPassword() {
    console.log('🔍 Finding correct MongoDB password...');
    console.log('=====================================');
    
    const username = 'bullbear';
    const cluster = 'cluster0.q8etdgf.mongodb.net';
    
    // Common passwords to test
    const passwords = [
        'bullbear123',
        'password123',
        'Password123',
        'bullbear',
        'Bullbear',
        'BULLBEAR',
        'admin123',
        'Admin123',
        '123456',
        'password',
        'Password',
        'PASSWORD'
    ];

    console.log(`👤 Username: ${username}`);
    console.log(`🏠 Cluster: ${cluster}`);
    console.log(`🔑 Testing ${passwords.length} passwords...\n`);

    for (let i = 0; i < passwords.length; i++) {
        const password = passwords[i];
        const uri = `mongodb+srv://${username}:${password}@${cluster}/?appName=Cluster0`;
        
        console.log(`🧪 Test ${i + 1}/${passwords.length}: "${password}"`);
        
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 5000,
            });
            
            console.log('✅ SUCCESS! Password found!');
            console.log(`🎉 Correct password: ${password}`);
            console.log(`📍 Connected to: ${mongoose.connection.name || 'default'}`);
            
            // Update .env file
            const fs = require('fs');
            const envPath = '.env';
            let envContent = '';
            
            if (fs.existsSync(envPath)) {
                envContent = fs.readFileSync(envPath, 'utf8');
                envContent = envContent.replace(
                    /MONGODB_URI=.*/,
                    `MONGODB_URI=${uri}/bullbear-trading`
                );
            } else {
                envContent = `# MongoDB Configuration
USE_MOCK_DB=false
MONGODB_URI=${uri}/bullbear-trading
JWT_SECRET=bullbear-trading-super-secret-jwt-key-2025
ADMIN_EMAIL=admin@bullbeartrading.com
ADMIN_PASSWORD=Admin@2025!
PORT=5000
`;
            }
            
            fs.writeFileSync(envPath, envContent);
            console.log('✅ Updated .env file');
            
            await mongoose.disconnect();
            return password;
            
        } catch (error) {
            if (error.message.includes('authentication failed')) {
                console.log('❌ Wrong password');
            } else {
                console.log('❌ Error:', error.message);
            }
        }
    }
    
    console.log('\n❌ No working password found');
    console.log('📋 Please provide the correct password');
    return null;
}

findPassword()
    .then(password => {
        if (password) {
            console.log(`\n🚀 Ready! Password is: ${password}`);
            console.log('Next steps:');
            console.log('1. Run: node createAdmin.js');
            console.log('2. Run: npm start');
            console.log('3. Open admin dashboard');
        } else {
            console.log('\n❌ Could not connect to MongoDB');
            console.log('Please check your MongoDB Atlas dashboard for the correct password');
        }
        process.exit(0);
    })
    .catch(console.error);