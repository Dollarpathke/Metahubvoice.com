const User = require('./models/User');

async function fixAdminRole() {
    console.log('🔧 Fixing admin user role...\n');
    
    try {
        // Find the admin user
        const user = await User.findOne({ email: 'admin@bullbeartrading.com' });
        
        if (!user) {
            console.log('❌ Admin user not found. Creating new admin user...');
            
            // Create new admin user
            const adminUser = await User.create({
                email: 'admin@bullbeartrading.com',
                password: 'Admin@2025!',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin'
            });
            
            console.log('✅ New admin user created with admin role!');
            console.log('📧 Email:', adminUser.email);
            console.log('👤 Role:', adminUser.role);
        } else {
            console.log('👤 Found user:', user.email);
            console.log('🔍 Current role:', user.role);
            
            if (user.role !== 'admin') {
                user.role = 'admin';
                await user.save();
                console.log('✅ User role updated to admin!');
            } else {
                console.log('✅ User already has admin role!');
            }
        }
        
        console.log('\n🎉 Admin user is ready for login!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

fixAdminRole();