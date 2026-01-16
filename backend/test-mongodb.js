const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testMongoDBConnection() {
    console.log('🧪 Testing MongoDB Atlas Connection...\n');
    
    if (process.env.USE_MOCK_DB === 'true') {
        console.log('❌ Mock database is enabled!');
        console.log('💡 Set USE_MOCK_DB=false in .env to test real MongoDB\n');
        return;
    }
    
    if (!process.env.MONGODB_URI) {
        console.log('❌ MONGODB_URI not found in .env file');
        console.log('💡 Please add your MongoDB Atlas connection string\n');
        return;
    }
    
    if (process.env.MONGODB_URI.includes('<db_password>')) {
        console.log('❌ Please replace <db_password> with your actual MongoDB password');
        console.log('💡 Update MONGODB_URI in .env file\n');
        return;
    }
    
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        console.log('📍 Database:', process.env.MONGODB_URI.split('@')[1]?.split('/')[1]?.split('?')[0] || 'bullbear-trading');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000
        });
        
        console.log('✅ MongoDB Atlas connection successful!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('⚡ Ready state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');
        
        // Test creating a simple document
        const testSchema = new mongoose.Schema({
            name: String,
            timestamp: { type: Date, default: Date.now }
        });
        
        const TestModel = mongoose.model('Test', testSchema);
        
        const testDoc = new TestModel({
            name: 'BullBear Trading Connection Test'
        });
        
        await testDoc.save();
        console.log('✅ Test document created successfully');
        
        // Clean up test document
        await TestModel.deleteOne({ _id: testDoc._id });
        console.log('🧹 Test document cleaned up');
        
        console.log('\n🎉 MongoDB Atlas is ready for BullBear Trading!');
        console.log('💡 You can now restart your backend server');
        
    } catch (error) {
        console.log('❌ MongoDB connection failed:');
        console.log('Error:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.log('\n💡 Authentication failed - Check your username/password');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('\n💡 Network error - Check your connection string');
        } else if (error.message.includes('timeout')) {
            console.log('\n💡 Connection timeout - Check network access settings');
        }
        
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Verify username/password in connection string');
        console.log('2. Check network access allows 0.0.0.0/0');
        console.log('3. Ensure cluster is running');
        console.log('4. Try copying connection string again');
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

// Run the test
testMongoDBConnection().catch(console.error);