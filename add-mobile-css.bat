@echo off
echo ========================================
echo BullBear Trading - Mobile CSS Installer
echo ========================================
echo.
echo This script will add mobile optimizations to your index.html
echo.
pause

echo.
echo Backing up index.html...
copy index.html index.html.backup
echo Backup created: index.html.backup
echo.

echo Adding mobile CSS link to index.html...
echo.

REM This will be done manually - open index.html and add the link

echo.
echo ========================================
echo MANUAL STEP REQUIRED
echo ========================================
echo.
echo Please open index.html and add this line in the head section:
echo.
echo ^<link rel="stylesheet" href="mobile-optimizations.css"^>
echo.
echo Add it right before the closing ^</head^> tag
echo.
echo ========================================
echo.
echo Files created:
echo - mobile-optimizations.css (Mobile styles)
echo - MOBILE_OPTIMIZATION_GUIDE.md (Implementation guide)
echo - index.html.backup (Backup of original)
echo.
echo Next steps:
echo 1. Add the CSS link to index.html (see above)
echo 2. Test on mobile devices
echo 3. Review MOBILE_OPTIMIZATION_GUIDE.md for details
echo.
pause
