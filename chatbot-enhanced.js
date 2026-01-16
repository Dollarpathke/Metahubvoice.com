// Enhanced AI Chatbot for Bull Bear Trading
class BullBearChatbot {
    constructor() {
        this.knowledgeBase = {
            company: {
                name: 'Bull Bear Trading',
                tagline: 'Master the Markets',
                mission: 'To empower individuals with the knowledge and tools needed to navigate the decentralized financial landscape confidently.',
                vision: 'To become the leading educational platform for cryptocurrency and blockchain technology, fostering a community of informed and successful crypto enthusiasts.',
                founded: '2024',
                ceo: 'Seth Cryptolord'
            },
            courses: [
                {
                    name: 'Crypto Trading Mastery Course',
                    price: 500,
                    description: 'Master cryptocurrency trading with technical analysis and proven strategies',
                    duration: '12 hours',
                    level: 'Intermediate'
                },
                {
                    name: 'DeFi Fundamentals',
                    price: 350,
                    description: 'Complete guide to Decentralized Finance and yield farming',
                    duration: '8 hours',
                    level: 'Beginner'
                },
                {
                    name: 'NFT Masterclass',
                    price: 299,
                    description: 'Create and profit from NFTs',
                    duration: '6 hours',
                    level: 'Beginner'
                },
                {
                    name: 'Blockchain Development Bootcamp',
                    price: 799,
                    description: 'Become a blockchain developer with Solidity and Web3',
                    duration: '20 hours',
                    level: 'Advanced'
                },
                {
                    name: 'Crypto Portfolio Management Pro',
                    price: 399,
                    description: 'Build and manage profitable crypto portfolios',
                    duration: '10 hours',
                    level: 'Intermediate'
                },
                {
                    name: 'Crypto Security Essentials',
                    price: 199,
                    description: 'Protect your crypto assets like a pro',
                    duration: '5 hours',
                    level: 'Beginner'
                }
            ],
            faqs: [
                {
                    question: 'How do I access my purchased courses?',
                    answer: 'After purchase, log in to your account and visit the "My Library" page. All your purchased courses will be available there with instant access.'
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept PayPal, credit cards, and cryptocurrency payments. All transactions are secure and encrypted.'
                },
                {
                    question: 'Do you offer refunds?',
                    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, contact us within 30 days for a full refund.'
                },
                {
                    question: 'Are the courses suitable for beginners?',
                    answer: 'Yes! We offer courses for all levels - beginner, intermediate, and advanced. Each course clearly indicates its difficulty level.'
                },
                {
                    question: 'How long do I have access to the courses?',
                    answer: 'All courses come with lifetime access. Once purchased, you can access the content anytime, anywhere, forever.'
                },
                {
                    question: 'Do you provide certificates?',
                    answer: 'Yes, upon completion of each course, you\'ll receive a certificate of completion that you can share on LinkedIn and other platforms.'
                }
            ],
            support: {
                email: 'support@metahubvoice.com',
                hours: '24/7 Support Available',
                responseTime: 'Usually within 2-4 hours'
            }
        };

        this.conversationHistory = [];
    }

    // Analyze user intent
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.match(/course|class|learn|training|education/)) {
            return 'courses';
        }
        if (lowerMessage.match(/price|cost|how much|payment|pay/)) {
            return 'pricing';
        }
        if (lowerMessage.match(/ceo|founder|seth|who (runs|owns|created)/)) {
            return 'ceo';
        }
        if (lowerMessage.match(/mission|purpose|goal|why/)) {
            return 'mission';
        }
        if (lowerMessage.match(/vision|future|plan/)) {
            return 'vision';
        }
        if (lowerMessage.match(/contact|support|help|email/)) {
            return 'support';
        }
        if (lowerMessage.match(/refund|money back|guarantee/)) {
            return 'refund';
        }
        if (lowerMessage.match(/access|login|library|purchased/)) {
            return 'access';
        }
        if (lowerMessage.match(/beginner|start|new to crypto/)) {
            return 'beginner';
        }
        if (lowerMessage.match(/trading|trade|buy|sell/)) {
            return 'trading';
        }
        if (lowerMessage.match(/defi|decentralized finance|yield/)) {
            return 'defi';
        }
        if (lowerMessage.match(/nft|non-fungible/)) {
            return 'nft';
        }
        if (lowerMessage.match(/blockchain|development|coding|programming/)) {
            return 'development';
        }
        if (lowerMessage.match(/security|safe|protect|wallet/)) {
            return 'security';
        }
        if (lowerMessage.match(/hello|hi|hey|greetings/)) {
            return 'greeting';
        }
        
        return 'general';
    }

    // Generate response based on intent
    generateResponse(intent, message) {
        const responses = {
            greeting: `Hello! 👋 Welcome to Bull Bear Trading - Master the Markets! I'm here to help you with:\n\n• Course information\n• Pricing and payments\n• Account access\n• General crypto education questions\n\nHow can I assist you today?`,
            
            courses: `We offer 6 comprehensive courses:\n\n1. 🎯 Crypto Trading Mastery ($500) - 12 hours\n2. 💎 DeFi Fundamentals ($350) - 8 hours\n3. 🖼️ NFT Masterclass ($299) - 6 hours\n4. 💻 Blockchain Development Bootcamp ($799) - 20 hours\n5. 📊 Crypto Portfolio Management Pro ($399) - 10 hours\n6. 🔒 Crypto Security Essentials ($199) - 5 hours\n\nAll courses include lifetime access! Which one interests you?`,
            
            pricing: `Our courses range from $199 to $799:\n\n• Crypto Security Essentials: $199\n• NFT Masterclass: $299\n• DeFi Fundamentals: $350\n• Portfolio Management Pro: $399\n• Crypto Trading Mastery: $500\n• Blockchain Development: $799\n\nWe accept PayPal, credit cards, and crypto payments. All purchases include lifetime access!`,
            
            ceo: `Bull Bear Trading was founded by Seth Cryptolord, a passionate crypto educator and blockchain enthusiast. Seth's mission is to democratize crypto education and empower individuals to achieve financial freedom through decentralized wealth.`,
            
            mission: `Our Mission: ${this.knowledgeBase.company.mission}\n\nWe believe everyone deserves access to quality crypto education, regardless of their background or experience level.`,
            
            vision: `Our Vision: ${this.knowledgeBase.company.vision}\n\nWe're building a global community of informed crypto enthusiasts who can navigate the decentralized future with confidence.`,
            
            support: `📧 Email: ${this.knowledgeBase.support.email}\n⏰ Hours: ${this.knowledgeBase.support.hours}\n⚡ Response Time: ${this.knowledgeBase.support.responseTime}\n\nWe're here to help! Feel free to reach out anytime.`,
            
            refund: `We offer a 30-day money-back guarantee! If you're not completely satisfied with your purchase, contact us within 30 days at ${this.knowledgeBase.support.email} for a full refund. No questions asked!`,
            
            access: `To access your purchased courses:\n\n1. Click "My Library" in the navigation menu\n2. Log in with your email\n3. All your courses will be available instantly\n\nYou have lifetime access to all purchased content!`,
            
            beginner: `Perfect! We have excellent beginner-friendly courses:\n\n1. 🔒 Crypto Security Essentials ($199) - Start here to protect your assets\n2. 🖼️ NFT Masterclass ($299) - Learn about the NFT revolution\n3. 💎 DeFi Fundamentals ($350) - Understand decentralized finance\n\nAll include step-by-step guidance for complete beginners!`,
            
            trading: `Our Crypto Trading Mastery Course ($500) is perfect for you! You'll learn:\n\n• Technical analysis fundamentals\n• Chart patterns & indicators\n• Risk management strategies\n• Trading psychology\n• Live trading examples\n\n12 hours of comprehensive content with lifetime access!`,
            
            defi: `Check out our DeFi Fundamentals course ($350)! Learn:\n\n• DeFi ecosystem overview\n• Yield farming strategies\n• Liquidity pool management\n• Smart contract basics\n• Security best practices\n\n8 hours of in-depth DeFi education!`,
            
            nft: `Our NFT Masterclass ($299) covers everything:\n\n• NFT market analysis\n• Creating NFT collections\n• Smart contract deployment\n• Marketing your NFTs\n• Royalty structures\n\n6 hours of practical NFT knowledge!`,
            
            development: `The Blockchain Development Bootcamp ($799) is our most comprehensive course:\n\n• Solidity programming\n• Smart contract development\n• Web3.js & Ethers.js\n• dApp development\n• Testing & deployment\n\n20 hours of hands-on coding!`,
            
            security: `Crypto Security Essentials ($199) teaches you:\n\n• Wallet security best practices\n• Cold storage solutions\n• Phishing prevention\n• Two-factor authentication\n• Backup & recovery strategies\n\nProtect your crypto assets like a pro!`,
            
            general: `I'm here to help! I can assist you with:\n\n• 📚 Course information and recommendations\n• 💰 Pricing and payment options\n• 👤 Account and access questions\n• 🎓 Learning path guidance\n• 📧 Support contact information\n\nWhat would you like to know?`
        };

        return responses[intent] || responses.general;
    }

    // Main chat function
    chat(userMessage) {
        this.conversationHistory.push({ role: 'user', message: userMessage });
        
        const intent = this.analyzeIntent(userMessage);
        const response = this.generateResponse(intent, userMessage);
        
        this.conversationHistory.push({ role: 'bot', message: response });
        
        return response;
    }

    // Get conversation history
    getHistory() {
        return this.conversationHistory;
    }

    // Clear conversation
    clearHistory() {
        this.conversationHistory = [];
    }
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BullBearChatbot;
}
