const axios = require('axios');

async function createAdmin() {
    console.log('🔐 Creating admin user via API...\n');
    
    const adminData = {
        email: 'admin@bullbeartrading.com',
        password: 'Admin@2025!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
    };
    
    try {
        // Try to register the admin user
        const response = await axios.post('http://localhost:5000/api/auth/signup', adminData);
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', adminData.email);
        console.log('🔑 Password:', adminData.password);
        
        // Test login
        console.log('\n🧪 Testing login...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: adminData.email,
            password: adminData.password
        });
        
        console.log('✅ Login successful!');
        console.log('🎫 Token received:', loginResponse.data.token ? 'Yes' : 'No');
        
    } catch (error) {
        if (error.response) {
            console.log('❌ Error:', error.response.data.message);
            
            // If user already exists, try to login
            if (error.response.data.message.includes('already exists')) {
                console.log('\n🧪 User exists, testing login...');
                try {
                    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
                        email: adminData.email,
                        password: adminData.password
                    });
                    console.log('✅ Login successful!');
                    console.log('🎫 Token received:', loginResponse.data.token ? 'Yes' : 'No');
                } catch (loginError) {
                    console.log('❌ Login failed:', loginError.response?.data?.message || loginError.message);
                }
            }
        } else {
            console.log('❌ Network error:', error.message);
        }
    }
}

createAdmin();