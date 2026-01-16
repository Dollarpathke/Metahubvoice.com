@echo off
echo ========================================
echo 🚀 Bull Bear Trading Platform
echo ========================================
echo.

echo 📋 Starting Backend Server...
cd backend
start "Bull Bear Backend" cmd /k "npm start"
echo ✅ Backend starting on http://localhost:5000
echo.

echo 📋 Opening Platform Pages...
timeout /t 3 /nobreak >nul

echo 🌐 Opening Admin Dashboard...
start "" "..\admin-dashboard.html"

echo 🌐 Opening Course Page...
start "" "..\crypto-trading-course.html"

echo 🌐 Opening Main Site...
start "" "..\index.html"

echo.
echo ========================================
echo 🎉 Platform Ready!
echo ========================================
echo.
echo 🔗 Backend API: http://localhost:5000
echo 🔗 Health Check: http://localhost:5000/api/health
echo 📊 Using Mock Database (fully functional)
echo.
echo 💡 MongoDB will connect automatically once
echo    user propagation completes (5-10 minutes)
echo.
pause