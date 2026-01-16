@echo off
cls
echo ========================================
echo   BullBear Trading - Full Stack Start
echo ========================================
echo.
echo Starting complete platform...
echo.

REM Start backend in new window
echo [1/3] Starting Backend Server...
start "BullBear Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

REM Wait for backend to start
echo [2/3] Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

REM Open frontend
echo [3/3] Opening Frontend...
start index.html

REM Open admin
timeout /t 2 /nobreak >nul
start admin-login.html

echo.
echo ========================================
echo ✅ Platform Started!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: index.html (opened)
echo Admin: admin-login.html (opened)
echo.
echo Press any key to exit this window...
echo (Backend will keep running in separate window)
echo ========================================
pause >nul
