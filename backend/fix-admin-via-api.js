const axios = require('axios');

async function fixAdminRole() {
    console.log('🔧 Fixing admin user role via API...\n');
    
    try {
        // First, let's create a new admin user with the correct role
        const adminData = {
            email: 'admin@bullbeartrading.com',
            password: 'Admin@2025!',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
        };
        
        // Try to create admin user via signup (it will fail if exists, but that's ok)
        try {
            await axios.post('http://localhost:5000/api/auth/signup', adminData);
            console.log('✅ New admin user created!');
        } catch (error) {
            if (error.response?.data?.message?.includes('already registered')) {
                console.log('ℹ️  Admin user already exists');
            } else {
                console.log('❌ Error creating user:', error.response?.data?.message || error.message);
            }
        }
        
        // Now test admin login
        console.log('\n🧪 Testing admin login...');
        try {
            const loginResponse = await axios.post('http://localhost:5000/api/admin/login', {
                email: 'admin@bullbeartrading.com',
                password: 'Admin@2025!'
            });
            
            console.log('✅ Admin login successful!');
            console.log('🎫 Token received:', loginResponse.data.data.token ? 'Yes' : 'No');
            console.log('👤 User role:', loginResponse.data.data.user.role);
            
            if (loginResponse.data.data.token) {
                console.log('\n🎉 Admin dashboard should work now!');
                console.log('📧 Use email: admin@bullbeartrading.com');
                console.log('🔑 Use password: Admin@2025!');
            }
            
        } catch (loginError) {
            console.log('❌ Admin login failed:', loginError.response?.data?.message || loginError.message);
            
            if (loginError.response?.data?.message?.includes('Admin privileges required')) {
                console.log('\n🔧 Need to fix user role. Let me try a different approach...');
                
                // Create a completely new admin user with a different email
                const newAdminData = {
                    email: 'superadmin@bullbeartrading.com',
                    password: 'SuperAdmin@2025!',
                    firstName: 'Super',
                    lastName: 'Admin',
                    role: 'admin'
                };
                
                try {
                    await axios.post('http://localhost:5000/api/auth/signup', newAdminData);
                    console.log('✅ Created new super admin user!');
                    
                    // Test login with new admin
                    const newLoginResponse = await axios.post('http://localhost:5000/api/admin/login', {
                        email: 'superadmin@bullbeartrading.com',
                        password: 'SuperAdmin@2025!'
                    });
                    
                    console.log('✅ Super admin login successful!');
                    console.log('📧 Use email: superadmin@bullbeartrading.com');
                    console.log('🔑 Use password: SuperAdmin@2025!');
                    
                } catch (newAdminError) {
                    console.log('❌ Failed to create super admin:', newAdminError.response?.data?.message || newAdminError.message);
                }
            }
        }
        
    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
}

fixAdminRole();