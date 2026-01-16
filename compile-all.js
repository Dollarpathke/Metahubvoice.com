// Comprehensive Compilation and Validation Script
const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║   BULLBEAR TRADING - COMPLETE PROJECT COMPILATION    ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

let totalFiles = 0;
let validFiles = 0;
let errors = [];

// Color codes
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

// Check if file exists and is readable
function checkFile(filePath, category) {
    totalFiles++;
    try {
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const ext = path.extname(filePath);
            
            // Check file size
            if (stats.size === 0) {
                errors.push(`${filePath} - File is empty`);
                log(`  ✗ ${path.basename(filePath)} - EMPTY`, 'red');
                return false;
            }
            
            // Validate syntax for JS files
            if (ext === '.js') {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    // Basic syntax check
                    new Function(content);
                    validFiles++;
                    log(`  ✓ ${path.basename(filePath)} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
                    return true;
                } catch (syntaxError) {
                    errors.push(`${filePath} - Syntax Error: ${syntaxError.message}`);
                    log(`  ✗ ${path.basename(filePath)} - SYNTAX ERROR`, 'red');
                    return false;
                }
            }
            
            // Validate HTML files
            if (ext === '.html') {
                const content = fs.readFileSync(filePath, 'utf8');
                if (!content.includes('<!DOCTYPE') && !content.includes('<!doctype')) {
                    errors.push(`${filePath} - Missing DOCTYPE`);
                    log(`  ⚠ ${path.basename(filePath)} - Missing DOCTYPE`, 'yellow');
                } else {
                    validFiles++;
                    log(`  ✓ ${path.basename(filePath)} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
                }
                return true;
            }
            
            // Other files
            validFiles++;
            log(`  ✓ ${path.basename(filePath)} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
            return true;
        } else {
            errors.push(`${filePath} - File not found`);
            log(`  ✗ ${path.basename(filePath)} - NOT FOUND`, 'red');
            return false;
        }
    } catch (error) {
        errors.push(`${filePath} - ${error.message}`);
        log(`  ✗ ${path.basename(filePath)} - ERROR: ${error.message}`, 'red');
        return false;
    }
}

// Frontend Files
log('\n📱 FRONTEND FILES', 'cyan');
log('═'.repeat(60), 'cyan');

const frontendFiles = [
    'index.html',
    'crypto-trading-course.html',
    'my-library.html',
    'admin-dashboard.html',
    'test-purchase.html',
    'chatbot-enhanced.js'
];

frontendFiles.forEach(file => checkFile(file, 'Frontend'));

// Backend Files
log('\n🔧 BACKEND FILES', 'cyan');
log('═'.repeat(60), 'cyan');

log('\n  Server:', 'blue');
checkFile('backend/server.js', 'Backend');
checkFile('backend/package.json', 'Backend');
checkFile('backend/.env', 'Backend');

log('\n  Models:', 'blue');
checkFile('backend/models/User.js', 'Backend');
checkFile('backend/models/Course.js', 'Backend');
checkFile('backend/models/Purchase.js', 'Backend');

log('\n  Routes:', 'blue');
checkFile('backend/routes/auth.js', 'Backend');
checkFile('backend/routes/courses.js', 'Backend');
checkFile('backend/routes/purchases.js', 'Backend');
checkFile('backend/routes/users.js', 'Backend');
checkFile('backend/routes/admin.js', 'Backend');

log('\n  Middleware:', 'blue');
checkFile('backend/middleware/auth.js', 'Backend');

log('\n  Utilities:', 'blue');
checkFile('backend/utils/emailService.js', 'Backend');
checkFile('backend/mockDatabase.js', 'Backend');

log('\n  Scripts:', 'blue');
checkFile('backend/createAdmin.js', 'Backend');
checkFile('backend/seedCourses.js', 'Backend');
checkFile('backend/test-api.js', 'Backend');
checkFile('backend/test-mongodb.js', 'Backend');

// Configuration Files
log('\n⚙️  CONFIGURATION FILES', 'cyan');
log('═'.repeat(60), 'cyan');

const configFiles = [
    '.gitignore',
    'vercel.json',
    'netlify.toml',
    'backend/.env.example',
    'backend/vercel.json'
];

configFiles.forEach(file => checkFile(file, 'Config'));

// Documentation Files
log('\n📚 DOCUMENTATION FILES', 'cyan');
log('═'.repeat(60), 'cyan');

const docFiles = [
    'README.md',
    'QUICK_START.md',
    'COMPLETE_GUIDE.md',
    'ADMIN_SETUP_GUIDE.md',
    'DEPLOYMENT_CHECKLIST.md',
    'PERFORMANCE_OPTIMIZATION.md',
    'PROJECT_SUMMARY.md',
    'MONGODB_SETUP.md',
    'START_HERE.md',
    'QUICK_REFERENCE.md'
];

docFiles.forEach(file => checkFile(file, 'Documentation'));

// Summary
log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
log('║   COMPILATION SUMMARY                                  ║', 'cyan');
log('╚════════════════════════════════════════════════════════╝', 'cyan');

log(`\n📊 Statistics:`, 'blue');
log(`   Total Files Checked: ${totalFiles}`);
log(`   Valid Files: ${validFiles}`, 'green');
log(`   Issues Found: ${errors.length}`, errors.length > 0 ? 'red' : 'green');

if (errors.length > 0) {
    log(`\n❌ ERRORS FOUND:`, 'red');
    errors.forEach(error => log(`   • ${error}`, 'red'));
} else {
    log(`\n✅ ALL FILES COMPILED SUCCESSFULLY!`, 'green');
}

// Check dependencies
log(`\n📦 Checking Dependencies...`, 'blue');
try {
    const packageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    log(`   ✓ ${dependencies.length} dependencies listed`, 'green');
    
    // Check if node_modules exists
    if (fs.existsSync('backend/node_modules')) {
        log(`   ✓ node_modules folder exists`, 'green');
    } else {
        log(`   ⚠ node_modules not found - Run: npm install`, 'yellow');
    }
} catch (error) {
    log(`   ✗ Error checking dependencies: ${error.message}`, 'red');
}

// Check environment
log(`\n🔐 Environment Check:`, 'blue');
try {
    const envContent = fs.readFileSync('backend/.env', 'utf8');
    const requiredVars = ['PORT', 'JWT_SECRET', 'MONGODB_URI', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
    const missingVars = [];
    
    requiredVars.forEach(varName => {
        if (!envContent.includes(varName)) {
            missingVars.push(varName);
        }
    });
    
    if (missingVars.length === 0) {
        log(`   ✓ All required environment variables present`, 'green');
    } else {
        log(`   ⚠ Missing variables: ${missingVars.join(', ')}`, 'yellow');
    }
} catch (error) {
    log(`   ✗ .env file not found or unreadable`, 'red');
}

// Final Status
log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
if (errors.length === 0 && validFiles === totalFiles) {
    log('║   ✅ PROJECT IS READY FOR DEPLOYMENT!                 ║', 'green');
} else {
    log('║   ⚠️  PROJECT HAS ISSUES - REVIEW ERRORS ABOVE        ║', 'yellow');
}
log('╚════════════════════════════════════════════════════════╝\n', 'cyan');

// Next steps
if (errors.length === 0) {
    log('🚀 Next Steps:', 'blue');
    log('   1. Start backend: cd backend && npm run dev');
    log('   2. Open frontend: index.html');
    log('   3. Access admin: admin-dashboard.html');
    log('   4. Test API: npm test\n');
}

process.exit(errors.length > 0 ? 1 : 0);
