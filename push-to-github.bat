@echo off
echo ========================================
echo Metahub Voice - GitHub Push Script
echo ========================================
echo.

REM Initialize Git repository
echo [1/5] Initializing Git repository...
git init
echo.

REM Add all files
echo [2/5] Adding all files...
git add .
echo.

REM Create initial commit
echo [3/5] Creating initial commit...
git commit -m "Initial commit: Metahub Voice - The Voice of Decentralized Wealth"
echo.

REM Add remote repository
echo [4/5] Adding GitHub repository...
git remote add origin https://github.com/Dollarpathke/Metahubvoice.com.git
echo.

REM Push to GitHub
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main
echo.

echo ========================================
echo Done! Your project is now on GitHub!
echo Repository: https://github.com/Dollarpathke/Metahubvoice.com
echo ========================================
pause
