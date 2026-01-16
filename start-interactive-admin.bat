@echo off
echo ========================================
echo   🎯 BullBear Trading Admin Dashboard
echo ========================================
echo.

REM Check if backend is running
echo 🔍 Checking backend status...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Backend is not running!
    echo.
    echo 🚀 Starting backend server...
    start "BullBear Backend" cmd /k "cd backend && npm start"
    echo ⏳ Waiting for backend to start...
    timeout /t 5 /nobreak >nul
) else (
    echo ✅ Backend is already running!
)

echo.
echo 🌐 Opening Admin Dashboard...
start "" "admin-dashboard.html"

echo.
echo ========================================
echo   📋 Dashboard Features:
echo ========================================
echo   ✅ Real-time connection monitoring
echo   ✅ Stats: Revenue, Users, Purchases
echo   ✅ Purchase approval/rejection
echo   ✅ User management (role changes)
echo   ✅ Advanced filtering and search
echo   ✅ Auto-refresh every 30 seconds
echo   ✅ Modal purchase details
echo ========================================
echo.
echo 🔐 Login Credentials:
echo    Email: admin@bullbeartrading.com
echo    Password: Admin@2025!
echo.
pause