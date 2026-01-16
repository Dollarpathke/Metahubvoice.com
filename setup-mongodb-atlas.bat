@echo off
echo.
echo ========================================
echo   MONGODB ATLAS SETUP FOR BULLBEAR TRADING
echo ========================================
echo.
echo Follow these steps to set up your FREE MongoDB Atlas database:
echo.
echo 1. Go to: https://cloud.mongodb.com
echo 2. Sign up for a FREE account
echo 3. Create a FREE M0 Sandbox cluster
echo 4. Create database user: bullbeartrading
echo 5. Allow network access from anywhere (0.0.0.0/0)
echo 6. Get your connection string
echo.
echo Your connection string should look like:
echo mongodb+srv://bullbeartrading:YOUR_PASSWORD@bullbear-trading.xxxxx.mongodb.net/bullbear-trading?retryWrites=true^&w=majority
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Copy your MongoDB connection string
echo 2. Replace YOUR_PASSWORD_HERE in backend/.env file
echo 3. Run: npm start (in backend folder)
echo.
echo Example .env update:
echo MONGODB_URI=mongodb+srv://bullbeartrading:MySecurePassword123@bullbear-trading.abc123.mongodb.net/bullbear-trading?retryWrites=true^&w=majority
echo.
echo ========================================
echo   TESTING CONNECTION:
echo ========================================
echo.
echo After updating .env, test with:
echo cd backend
echo node test-mongodb.js
echo.
pause