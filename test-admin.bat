@echo off
echo ========================================
echo   BullBear Trading - Admin Test
echo ========================================
echo.

echo Starting backend server...
cd backend
start cmd /k "npm start"

timeout /t 5 /nobreak >nul

echo.
echo Opening admin dashboard...
start admin-dashboard.html

echo.
echo ========================================
echo   Admin Dashboard Test Started!
echo ========================================
echo.
echo 1. Backend server is starting...
echo 2. Admin dashboard will open in browser
echo 3. Login with your admin credentials
echo.
echo Default credentials:
echo Email: admin@bullbeartrading.com
echo Password: Admin123!
echo.
echo If admin doesn't exist, run:
echo   cd backend
echo   node createAdmin.js
echo.
echo ========================================
pause
