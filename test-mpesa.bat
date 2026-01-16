@echo off
echo ========================================
echo   M-Pesa Integration Test
echo   BullBear Trading Platform
echo ========================================
echo.
echo Starting backend server...
echo.
cd backend
start cmd /k "npm start"
timeout /t 3 /nobreak >nul
echo.
echo Backend started on http://localhost:5000
echo.
echo Opening indicators page...
start "" "..\trading-indicators.html"
echo.
echo ========================================
echo   Test Instructions:
echo ========================================
echo 1. Click "Subscribe Now" button
echo 2. Select "M-Pesa (Kenya)" payment method
echo 3. Enter test phone: 254708374149
echo 4. Click "Send Payment Prompt"
echo 5. Check backend console for logs
echo.
echo Note: You need Safaricom API credentials
echo      in backend/.env to test real STK Push
echo.
echo Press any key to exit...
pause >nul
