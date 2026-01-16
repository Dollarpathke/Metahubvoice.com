// Test MongoDB Connection Script
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    console.log('🔍 Testing MongoDB Connection...');
    console.log('=====================================');
    
    // Test different connection scenarios
    const testConnections = [
        {
            name: 'Current .env configuration',
            uri: process.env.MONGODB_URI
        },
        {
            name: 'Without database name',
            uri: 'mongodb+srv://bullbear:password123@cluster0.q8etdgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        },
        {
            name: 'With different database name',
            uri: 'mongodb+srv://bullbear:password123@cluster0.q8etdgf.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
        }
    ];

    for (const test of testConnections) {
        console.log(`\n🧪 Testing: ${test.name}`);
        console.log(`📍 URI: ${test.uri}`);
        
        try {
            await mongoose.connect(test.uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 5000,
            });
            
            console.log('✅ Connection successful!');
            console.log(`📊 Database: ${mongoose.connection.name}`);
            console.log(`🏠 Host: ${mongoose.connection.host}`);
            
            // Test basic operations
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log(`📁 Collections found: ${collections.length}`);
            
            await mongoose.disconnect();
            console.log('🔌 Disconnected successfully');
            break; // Stop on first successful connection
            
        } catch (error) {
            console.log('❌ Connection failed:', error.message);
            
            if (error.message.includes('authentication failed')) {
                console.log('🔑 Authentication issue - check username/password');
            } else if (error.message.includes('ENOTFOUND')) {
                console.log('🌐 Network issue - check cluster URL');
            } else if (error.message.includes('timeout')) {
                console.log('⏰ Timeout issue - check network/firewall');
            }
        }
    }
    
    console.log('\n=====================================');
    console.log('📋 Next Steps:');
    console.log('1. Check MongoDB Atlas dashboard');
    console.log('2. Verify database user credentials');
    console.log('3. Check IP whitelist (0.0.0.0/0 for all)');
    console.log('4. Ensure cluster is running');
    console.log('=====================================');
}

testConnection().catch(console.error);