const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function quickTest() {
    console.log('🧪 Quick MongoDB Connection Test...\n');
    
    try {
        console.log('🔗 Connecting...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ Connected successfully!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        
        await mongoose.disconnect();
        console.log('🔌 Disconnected');
        console.log('\n🎉 MongoDB is ready!');
        
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
    }
}

quickTest();