const mongoose = require('mongoose');

// MongoDB connection caching for serverless environments
let cachedConnection = null;

const connectDB = async () => {
    // Return cached connection if available
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('📦 Using cached database connection');
        return cachedConnection;
    }

    // Check for MongoDB URI
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        // Connection options optimized for serverless
        const options = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const connection = await mongoose.connect(process.env.MONGODB_URI, options);
        
        cachedConnection = connection;
        console.log('✅ MongoDB connected successfully');
        console.log(`📍 Database: ${connection.connection.name}`);
        
        return connection;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
    cachedConnection = null;
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

module.exports = connectDB;