@echo off
cls
echo ========================================
echo   BullBear Trading - Backend Server
echo ========================================
echo.
echo Starting backend on port 5000...
echo.
echo API will be available at:
echo http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd backend
npm start
