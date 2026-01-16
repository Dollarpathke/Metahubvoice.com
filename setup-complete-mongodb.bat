@echo off
echo ========================================
echo 🚀 Bull Bear Trading - MongoDB Setup
echo ========================================
echo.

echo 📋 Step 1: Installing Dependencies...
cd backend
call npm install
echo ✅ Dependencies installed!
echo.

echo 📋 Step 2: Testing MongoDB Connection...
node test-mongodb.js
echo.

echo 📋 Step 3: Creating Admin User...
node createAdmin.js
echo.

echo 📋 Step 4: Seeding Course Data...
node seedCourses.js
echo.

echo 📋 Step 5: Testing API Endpoints...
node test-api.js
echo.

echo ========================================
echo 🎉 Setup Complete!
echo ========================================
echo.
echo 💡 Next steps:
echo    1. Start backend: npm start
echo    2. Open frontend in browser
echo    3. Test admin dashboard
echo.
echo 🔗 API will be running on: http://localhost:5000
echo 🔗 Health check: http://localhost:5000/api/health
echo.
pause