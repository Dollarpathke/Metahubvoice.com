// API Testing Script for BullBear Trading Backend
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'Test123456!'
};

const testCourse = {
    courseId: 'crypto-trading-course',
    userEmail: testUser.email,
    amount: 500,
    paymentMethod: 'paypal-manual',
    orderId: `TEST-${Date.now()}`,
    transactionId: `TXN-${Date.now()}`
};

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    log(`Testing: ${testName}`, 'blue');
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

async function testHealthCheck() {
    logTest('Health Check');
    try {
        const response = await axios.get(`${API_URL}/health`);
        log('✓ Server is running', 'green');
        console.log(response.data);
        return true;
    } catch (error) {
        log('✗ Server health check failed', 'red');
        console.error(error.message);
        return false;
    }
}

async function testUserRegistration() {
    logTest('User Registration');
    try {
        const response = await axios.post(`${API_URL}/auth/register`, testUser);
        log('✓ User registered successfully', 'green');
        console.log(response.data);
        return response.data.data.token;
    } catch (error) {
        log('✗ User registration failed', 'red');
        console.error(error.response?.data || error.message);
        return null;
    }
}

async function testUserLogin() {
    logTest('User Login');
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        log('✓ User logged in successfully', 'green');
        console.log(response.data);
        return response.data.data.token;
    } catch (error) {
        log('✗ User login failed', 'red');
        console.error(error.response?.data || error.message);
        return null;
    }
}

async function testGetCourses() {
    logTest('Get All Courses');
    try {
        const response = await axios.get(`${API_URL}/courses`);
        log(`✓ Retrieved ${response.data.count} courses`, 'green');
        console.log(response.data.data.courses.map(c => `- ${c.title} ($${c.price})`).join('\n'));
        return true;
    } catch (error) {
        log('✗ Failed to get courses', 'red');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testGetCourseById() {
    logTest('Get Course by ID');
    try {
        const response = await axios.get(`${API_URL}/courses/${testCourse.courseId}`);
        log('✓ Course retrieved successfully', 'green');
        console.log(response.data.data.course);
        return true;
    } catch (error) {
        log('✗ Failed to get course', 'red');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testCreatePurchase() {
    logTest('Create Purchase');
    try {
        const response = await axios.post(`${API_URL}/purchases`, testCourse);
        log('✓ Purchase created successfully', 'green');
        console.log(response.data);
        return response.data.data.purchase;
    } catch (error) {
        log('✗ Failed to create purchase', 'red');
        console.error(error.response?.data || error.message);
        return null;
    }
}

async function testGetUserPurchases() {
    logTest('Get User Purchases');
    try {
        const response = await axios.get(`${API_URL}/purchases/user/${testUser.email}`);
        log(`✓ Retrieved ${response.data.count} purchases`, 'green');
        console.log(response.data);
        return true;
    } catch (error) {
        log('✗ Failed to get user purchases', 'red');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testVerifyPurchase(orderId) {
    logTest('Verify Purchase (Admin)');
    try {
        const response = await axios.put(`${API_URL}/purchases/${orderId}/verify`);
        log('✓ Purchase verified successfully', 'green');
        console.log(response.data);
        return true;
    } catch (error) {
        log('✗ Failed to verify purchase', 'red');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testGetPurchaseStats() {
    logTest('Get Purchase Statistics');
    try {
        const response = await axios.get(`${API_URL}/purchases/stats`);
        log('✓ Statistics retrieved successfully', 'green');
        console.log(response.data.data);
        return true;
    } catch (error) {
        log('✗ Failed to get statistics', 'red');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function runAllTests() {
    console.log('\n');
    log('╔════════════════════════════════════════════════════╗', 'cyan');
    log('║   BULLBEAR TRADING API TEST SUITE                ║', 'cyan');
    log('╚════════════════════════════════════════════════════╝', 'cyan');
    
    let passedTests = 0;
    let totalTests = 0;

    // Test 1: Health Check
    totalTests++;
    if (await testHealthCheck()) passedTests++;

    // Test 2: Get Courses
    totalTests++;
    if (await testGetCourses()) passedTests++;

    // Test 3: Get Course by ID
    totalTests++;
    if (await testGetCourseById()) passedTests++;

    // Test 4: User Registration
    totalTests++;
    const token = await testUserRegistration();
    if (token) passedTests++;

    // Test 5: User Login
    totalTests++;
    if (await testUserLogin()) passedTests++;

    // Test 6: Create Purchase
    totalTests++;
    const purchase = await testCreatePurchase();
    if (purchase) passedTests++;

    // Test 7: Get User Purchases
    totalTests++;
    if (await testGetUserPurchases()) passedTests++;

    // Test 8: Verify Purchase
    if (purchase) {
        totalTests++;
        if (await testVerifyPurchase(purchase.orderId)) passedTests++;
    }

    // Test 9: Get Statistics
    totalTests++;
    if (await testGetPurchaseStats()) passedTests++;

    // Summary
    console.log('\n');
    log('╔════════════════════════════════════════════════════╗', 'cyan');
    log('║   TEST SUMMARY                                     ║', 'cyan');
    log('╚════════════════════════════════════════════════════╝', 'cyan');
    
    const percentage = ((passedTests / totalTests) * 100).toFixed(1);
    log(`\nTests Passed: ${passedTests}/${totalTests} (${percentage}%)`, passedTests === totalTests ? 'green' : 'yellow');
    
    if (passedTests === totalTests) {
        log('\n🎉 All tests passed! Your API is working perfectly!', 'green');
    } else {
        log(`\n⚠️  ${totalTests - passedTests} test(s) failed. Please check the errors above.`, 'yellow');
    }
    
    console.log('\n');
}

// Run tests
runAllTests().catch(error => {
    log('\n✗ Test suite failed to run', 'red');
    console.error(error);
    process.exit(1);
});
