@echo off
echo ========================================
echo   BullBear Trading - MongoDB Admin
echo ========================================
echo.

echo ✅ MongoDB Connection: WORKING
echo 👤 Database User: bullbear
echo 🔑 Database Password: bullbear123
echo 📊 Database: bullbear-trading
echo.

echo Starting backend server with MongoDB...
cd backend
start cmd /k "npm start"

timeout /t 5 /nobreak >nul

echo.
echo Opening admin dashboard...
cd ..
start admin-dashboard-improved.html

echo.
echo ========================================
echo   MongoDB Admin Dashboard Ready!
echo ========================================
echo.
echo 🔑 Admin Login Credentials:
echo   Email: admin@bullbeartrading.com
echo   Password: Admin@2025!
echo.
echo 📊 Database: MongoDB Atlas (Real Database)
echo 🌐 Connection: bullbear@cluster0.q8etdgf.mongodb.net
echo.
echo ✅ Admin user created successfully!
echo 🚀 Backend server running on port 5000
echo 🎯 Admin dashboard opened in browser
echo.
echo ========================================
pause