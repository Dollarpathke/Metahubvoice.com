const axios = require('axios');

const courses = [
    {
        courseId: 'crypto-trading-mastery',
        title: 'Crypto Trading Mastery Course',
        description: 'Master the art of cryptocurrency trading with advanced strategies, technical analysis, and risk management techniques.',
        price: 500,
        currency: 'USD',
        image: '/images/crypto-trading-course.jpg',
        category: 'crypto',
        accessUrl: 'https://bullbeartrading.com/courses/crypto-trading-mastery',
        isActive: true,
        features: [
            'Advanced Technical Analysis',
            'Risk Management Strategies',
            'Portfolio Diversification',
            'Market Psychology',
            'Live Trading Sessions',
            'Lifetime Access'
        ],
        duration: '8 weeks',
        level: 'intermediate'
    },
    {
        courseId: 'defi-fundamentals',
        title: 'DeFi Fundamentals: Complete Guide',
        description: 'Comprehensive guide to Decentralized Finance (DeFi) protocols, yield farming, and liquidity mining.',
        price: 350,
        currency: 'USD',
        image: '/images/defi-course.jpg',
        category: 'crypto',
        accessUrl: 'https://bullbeartrading.com/courses/defi-fundamentals',
        isActive: true,
        features: [
            'DeFi Protocol Analysis',
            'Yield Farming Strategies',
            'Liquidity Mining',
            'Smart Contract Basics',
            'Risk Assessment',
            'Hands-on Projects'
        ],
        duration: '6 weeks',
        level: 'beginner'
    },
    {
        courseId: 'nft-masterclass',
        title: 'NFT Masterclass: Create & Profit',
        description: 'Learn how to create, market, and profit from NFTs in the booming digital collectibles market.',
        price: 299,
        currency: 'USD',
        image: '/images/nft-course.jpg',
        category: 'crypto',
        accessUrl: 'https://bullbeartrading.com/courses/nft-masterclass',
        isActive: true,
        features: [
            'NFT Creation Tools',
            'Marketplace Strategies',
            'Community Building',
            'Marketing Techniques',
            'Legal Considerations',
            'Case Studies'
        ],
        duration: '4 weeks',
        level: 'beginner'
    }
];

async function seedCourses() {
    console.log('🌱 Seeding courses via API...\n');
    
    try {
        for (const course of courses) {
            const response = await axios.post('http://localhost:5000/api/courses', course);
            console.log(`✅ Created: ${course.title}`);
        }
        
        console.log('\n🎉 All courses seeded successfully!');
        
        // Test the courses endpoint
        const response = await axios.get('http://localhost:5000/api/courses');
        console.log(`\n📊 Total courses: ${response.data.count}`);
        
    } catch (error) {
        console.error('❌ Error seeding courses:', error.message);
    }
}

seedCourses();