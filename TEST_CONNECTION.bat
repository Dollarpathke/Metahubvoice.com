@echo off
echo ========================================
echo   Testing Backend Connection
echo ========================================
echo.

echo Testing if backend is running...
echo.

curl -s http://localhost:5000 >nul 2>&1
if errorlevel 1 (
    echo ❌ BACKEND NOT RUNNING
    echo.
    echo The backend server is not responding on port 5000.
    echo.
    echo To fix this:
    echo 1. Run START_BACKEND.bat
    echo 2. Wait for "Server running on port 5000" message
    echo 3. Run this test again
    echo.
    pause
    exit /b 1
) else (
    echo ✅ BACKEND IS RUNNING!
    echo.
    echo Server is responding on http://localhost:5000
    echo.
)

echo Testing API health endpoint...
curl -s http://localhost:5000/api/health
echo.
echo.

echo Testing main endpoint...
curl -s http://localhost:5000
echo.
echo.

echo ========================================
echo   Connection Test Complete
echo ========================================
echo.
echo If you see JSON responses above, the backend is working!
echo.
pause
