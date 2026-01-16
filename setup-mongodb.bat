@echo off
echo ========================================
echo MongoDB Setup for Bull Bear Trading
echo ========================================
echo.
echo You need a MongoDB database to run this application.
echo.
echo OPTION 1: MongoDB Atlas (Recommended - Free Cloud Database)
echo   - No installation needed
echo   - Takes 5 minutes
echo   - Follow guide: MONGODB_SETUP.md
echo.
echo OPTION 2: Install MongoDB Locally
echo   - Download from: https://www.mongodb.com/try/download/community
echo   - Run installer
echo   - Start MongoDB service
echo.
echo ========================================
echo.
echo Opening MongoDB Atlas signup page...
timeout /t 3
start https://www.mongodb.com/cloud/atlas/register
echo.
echo Opening setup guide...
timeout /t 2
start MONGODB_SETUP.md
echo.
echo ========================================
echo After setting up MongoDB:
echo 1. Update backend/.env with your connection string
echo 2. Run: cd backend
echo 3. Run: npm run create-admin
echo ========================================
pause
