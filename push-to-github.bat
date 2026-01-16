@echo off
echo ========================================
echo  Push to GitHub - sethdev254
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Step 1: Cleaning up project...
call cleanup-for-github.bat

echo.
echo Step 2: Initializing Git repository...
if not exist .git (
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

echo.
echo Step 3: Adding files to Git...
git add .

echo.
echo Step 4: Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update BullBear Trading Platform

git commit -m "%commit_message%"

echo.
echo Step 5: Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/sethdev254/bullbear-trading.git

echo.
echo Step 6: Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  Push Complete!
echo ========================================
echo.
echo Your code is now on GitHub:
echo https://github.com/sethdev254/bullbear-trading
echo.
pause
