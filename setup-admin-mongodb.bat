@echo off
echo ========================================
echo   Setting up Admin in MongoDB
echo ========================================
echo.

echo Switching to real MongoDB database...
cd backend

echo.
echo Creating admin user in MongoDB...
node createAdmin.js

echo.
echo Starting backend server with MongoDB...
start cmd /k "npm start"

timeout /t 5 /nobreak >nul

echo.
echo Opening admin dashboard...
cd ..
start admin-dashboard-improved.html

echo.
echo ========================================
echo   MongoDB Admin Setup Complete!
echo ========================================
echo.
echo 1. Admin user created in MongoDB
echo 2. Backend server started with MongoDB
echo 3. Admin dashboard opened
echo.
echo Login credentials:
echo   Email: admin@bullbeartrading.com
echo   Password: Admin@2025!
echo.
echo ========================================
pause