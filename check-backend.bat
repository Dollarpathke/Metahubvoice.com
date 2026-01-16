@echo off
cls
echo ========================================
echo   Checking Backend Status
echo ========================================
echo.
echo Testing connection to http://localhost:5000...
echo.

curl -s http://localhost:5000/api/health

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ Backend is running on port 5000!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ❌ Backend is NOT running!
    echo.
    echo To start backend:
    echo 1. Double-click START_BACKEND.bat
    echo 2. Or run: cd backend ^&^& npm start
    echo ========================================
)
echo.
pause
