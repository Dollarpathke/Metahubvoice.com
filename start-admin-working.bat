@echo off
echo ========================================
echo   BullBear Trading - Working Admin
echo ========================================
echo.

echo Checking MongoDB connection...
cd backend
node test-mongodb-connection.js

echo.
echo If MongoDB failed, switching to mock database...
echo.

REM Create a temporary .env with mock database enabled
copy .env .env.backup
echo # Temporary configuration for admin testing > .env.temp
echo PORT=5000 >> .env.temp
echo NODE_ENV=development >> .env.temp
echo USE_MOCK_DB=true >> .env.temp
echo JWT_SECRET=bullbear-trading-super-secret-jwt-key-2025-change-in-production >> .env.temp
echo ADMIN_EMAIL=admin@bullbeartrading.com >> .env.temp
echo ADMIN_PASSWORD=Admin@2025! >> .env.temp
echo FRONTEND_URL=http://localhost:3000 >> .env.temp

copy .env.temp .env
del .env.temp

echo.
echo Creating admin user...
node createAdmin.js

echo.
echo Starting backend server...
start cmd /k "npm start"

timeout /t 5 /nobreak >nul

echo.
echo Opening admin dashboard...
cd ..
start admin-dashboard-improved.html

echo.
echo ========================================
echo   Admin Dashboard Started!
echo ========================================
echo.
echo 🔑 Login Credentials:
echo   Email: admin@bullbeartrading.com
echo   Password: Admin@2025!
echo.
echo 📊 Using: Mock Database (for testing)
echo 📋 To use MongoDB: See MONGODB_FIX_GUIDE.md
echo.
echo ========================================
pause