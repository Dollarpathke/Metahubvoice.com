const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');

// Import routes
const authRoutes = require('../routes/auth');
const courseRoutes = require('../routes/courses');
const purchaseRoutes = require('../routes/purchases');
const userRoutes = require('../routes/users');
const adminRoutes = require('../routes/admin');
const paypalRoutes = require('../routes/paypal');

// Initialize Express app
const app = express();

// MongoDB connection caching for serverless
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        maxPoolSize: 10,
    });

    cachedDb = connection;
    console.log('✅ MongoDB connected successfully');
    return cachedDb;
}

// Middleware
app.use(compression());
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database before handling requests
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/paypal', paypalRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'BullBear Trading API is running on Vercel',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Root endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to BullBear Trading API',
        tagline: 'Master the Markets',
        version: '1.0.0',
        platform: 'Vercel Serverless',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            admin: '/api/admin',
            courses: '/api/courses',
            purchases: '/api/purchases',
            users: '/api/users',
            paypal: '/api/paypal'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

module.exports = app;