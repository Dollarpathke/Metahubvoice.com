@echo off
echo ========================================
echo   BullBear Trading - Improved Admin
echo ========================================
echo.

echo Starting backend server...
cd backend
start cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo.
echo Opening improved admin dashboard...
cd ..
start admin-dashboard-improved.html

echo.
echo ========================================
echo   Admin Dashboard Started!
echo ========================================
echo.
echo 1. Backend server is starting in new window
echo 2. Admin dashboard opened in browser
echo 3. Login with credentials:
echo.
echo   Email: admin@bullbeartrading.com
echo   Password: Admin@2025!
echo.
echo If admin doesn't exist, run:
echo   cd backend
echo   node createAdmin.js
echo.
echo ========================================
pause