// Seed script to populate courses in the database
const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');

const courses = [
    {
        courseId: 'crypto-trading-course',
        title: 'Crypto Trading Mastery Course',
        description: 'Master the art of cryptocurrency trading with our comprehensive video course. Learn technical analysis, risk management, and proven trading strategies.',
        price: 500,
        currency: 'USD',
        category: 'Trading',
        level: 'Intermediate',
        duration: '12 hours',
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
        features: [
            'Technical Analysis Fundamentals',
            'Chart Patterns & Indicators',
            'Risk Management Strategies',
            'Trading Psychology',
            'Live Trading Examples',
            'Lifetime Access'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 4.8,
        reviews: 127
    },
    {
        courseId: 'defi-fundamentals',
        title: 'DeFi Fundamentals: Complete Guide',
        description: 'Dive deep into Decentralized Finance. Learn about yield farming, liquidity pools, lending protocols, and how to maximize your DeFi returns safely.',
        price: 350,
        currency: 'USD',
        category: 'DeFi',
        level: 'Beginner',
        duration: '8 hours',
        thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        features: [
            'DeFi Ecosystem Overview',
            'Yield Farming Strategies',
            'Liquidity Pool Management',
            'Smart Contract Basics',
            'Security Best Practices',
            'Real DeFi Project Analysis'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 4.9,
        reviews: 89
    },
    {
        courseId: 'nft-masterclass',
        title: 'NFT Masterclass: Create & Profit',
        description: 'Learn everything about NFTs - from creation to selling. Understand the market, create your own NFT collection, and build a profitable NFT business.',
        price: 299,
        currency: 'USD',
        category: 'NFT',
        level: 'Beginner',
        duration: '6 hours',
        thumbnail: 'https://images.unsplash.com/photo-1645731947596-4c0f0e5e6b8c?w=800',
        features: [
            'NFT Market Analysis',
            'Creating NFT Collections',
            'Smart Contract Deployment',
            'Marketing Your NFTs',
            'Royalty Structures',
            'Legal Considerations'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 4.7,
        reviews: 156
    },
    {
        courseId: 'blockchain-development',
        title: 'Blockchain Development Bootcamp',
        description: 'Become a blockchain developer. Learn Solidity, smart contract development, Web3 integration, and build real-world dApps from scratch.',
        price: 799,
        currency: 'USD',
        category: 'Development',
        level: 'Advanced',
        duration: '20 hours',
        thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
        features: [
            'Solidity Programming',
            'Smart Contract Development',
            'Web3.js & Ethers.js',
            'dApp Development',
            'Testing & Deployment',
            'Security Auditing'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 4.9,
        reviews: 203
    },
    {
        courseId: 'crypto-portfolio-management',
        title: 'Crypto Portfolio Management Pro',
        description: 'Build and manage a profitable crypto portfolio. Learn asset allocation, rebalancing strategies, tax optimization, and risk management.',
        price: 399,
        currency: 'USD',
        category: 'Investment',
        level: 'Intermediate',
        duration: '10 hours',
        thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
        features: [
            'Portfolio Construction',
            'Asset Allocation Strategies',
            'Rebalancing Techniques',
            'Tax Optimization',
            'Risk Assessment',
            'Performance Tracking'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 4.8,
        reviews: 94
    },
    {
        courseId: 'crypto-security-essentials',
        title: 'Crypto Security Essentials',
        description: 'Protect your crypto assets like a pro. Learn about wallet security, phishing prevention, cold storage, and best practices for keeping your crypto safe.',
        price: 199,
        currency: 'USD',
        category: 'Security',
        level: 'Beginner',
        duration: '5 hours',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
        features: [
            'Wallet Security',
            'Cold Storage Solutions',
            'Phishing Prevention',
            'Two-Factor Authentication',
            'Backup Strategies',
            'Recovery Procedures'
        ],
        instructor: 'Seth Cryptolord',
        totalPurchases: 0,
        rating: 5.0,
        reviews: 178
    }
];

async function seedCourses() {
    try {
        // Connect to database
        if (process.env.USE_MOCK_DB !== 'true') {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/metahub-voice');
            console.log('Connected to MongoDB');
        } else {
            console.log('Using Mock Database');
        }

        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses');

        // Insert new courses
        await Course.insertMany(courses);
        console.log(`Successfully seeded ${courses.length} courses`);

        // Display courses
        const allCourses = await Course.find({});
        console.log('\nCourses in database:');
        allCourses.forEach(course => {
            console.log(`- ${course.title} ($${course.price})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding courses:', error);
        process.exit(1);
    }
}

seedCourses();
