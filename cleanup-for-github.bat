@echo off
echo ========================================
echo  BullBear Platform - GitHub Cleanup
echo ========================================
echo.
echo This will remove unnecessary files before pushing to GitHub.
echo.
pause

echo.
echo Removing test files...
del /Q test-*.html 2>nul
del /Q test-*.bat 2>nul
del /Q debug-*.html 2>nul

echo Removing duplicate/old admin files...
del /Q admin-simple.html 2>nul
del /Q admin-auto.html 2>nul
del /Q admin-auto-login.html 2>nul
del /Q admin-functional.bat 2>nul
del /Q admin-modern.bat 2>nul
del /Q admin-interactive.html 2>nul
del /Q admin-modern.html 2>nul
del /Q admin-mongodb-final.html 2>nul
del /Q auto-login-admin.html 2>nul

echo Removing old index versions...
del /Q index-futuristic.html 2>nul
del /Q index-new.html 2>nul
del /Q original-metahub-voice.html 2>nul

echo Removing setup/utility batch files...
del /Q setup-*.bat 2>nul
del /Q start-*.bat 2>nul
del /Q open-*.bat 2>nul
del /Q check-*.bat 2>nul
del /Q OPEN-*.bat 2>nul
del /Q START_*.bat 2>nul
del /Q ADMIN-*.bat 2>nul
del /Q admin-*.bat 2>nul

echo Removing temporary documentation...
del /Q *_COMPLETE.md 2>nul
del /Q *_FIX*.md 2>nul
del /Q *_UPDATE*.md 2>nul
del /Q *_GUIDE*.md 2>nul
del /Q *_SETUP*.md 2>nul
del /Q *_STATUS*.md 2>nul
del /Q *_SUMMARY*.md 2>nul
del /Q *_CHECKLIST*.md 2>nul
del /Q *_INTEGRATION*.md 2>nul
del /Q *_INSTRUCTIONS*.md 2>nul
del /Q *_READY*.md 2>nul
del /Q *_ACCESS*.md 2>nul
del /Q *_DASHBOARD*.md 2>nul
del /Q *_PRO*.md 2>nul
del /Q *_LOCK*.md 2>nul
del /Q CONTEXT_*.md 2>nul
del /Q *_TRANSFER*.md 2>nul
del /Q BEFORE_AFTER*.md 2>nul
del /Q BULLBEAR_*.md 2>nul
del /Q CARDS_*.md 2>nul
del /Q CHECKLIST_*.md 2>nul
del /Q CLICKABLE_*.md 2>nul
del /Q DARK_*.md 2>nul
del /Q DATETIME_*.md 2>nul
del /Q FEATURED_*.md 2>nul
del /Q FIXED_*.md 2>nul
del /Q HERO_*.md 2>nul
del /Q INDICATORS_*.md 2>nul
del /Q LIVE_*.md 2>nul
del /Q LOGO_*.md 2>nul
del /Q MODERN_*.md 2>nul
del /Q MPESA_*.md 2>nul
del /Q NAVBAR_*.md 2>nul
del /Q PAYPAL_*.md 2>nul
del /Q PDF_*.md 2>nul
del /Q PRODUCT_*.md 2>nul
del /Q SCROLL_*.md 2>nul
del /Q SLEEK_*.md 2>nul
del /Q STORE_*.md 2>nul
del /Q VISUAL_*.md 2>nul

echo Removing utility HTML files...
del /Q auto-extract-cover.html 2>nul
del /Q extract-pdf-cover.html 2>nul
del /Q pdf-cover-extractor.html 2>nul
del /Q compile-all.js 2>nul

echo Removing old documentation...
del /Q ADD_*.md 2>nul
del /Q ADMIN_*.md 2>nul
del /Q BACKEND_*.md 2>nul
del /Q BUY_NOW_*.md 2>nul
del /Q COMPLETE_*.md 2>nul
del /Q DEPLOY_*.md 2>nul
del /Q DOCUMENTATION_*.md 2>nul
del /Q EXTRACT_*.md 2>nul
del /Q FINAL_*.md 2>nul
del /Q FIX_*.md 2>nul
del /Q GITHUB_*.md 2>nul
del /Q HOSTING_*.md 2>nul
del /Q INSTALL_*.md 2>nul
del /Q INTEGRATION_*.md 2>nul
del /Q MASTER_*.md 2>nul
del /Q MONGODB_*.md 2>nul
del /Q PASSWORD_*.md 2>nul
del /Q PERFORMANCE_*.md 2>nul
del /Q PROJECT_*.md 2>nul
del /Q QUICK_*.md 2>nul
del /Q REBRANDING_*.md 2>nul
del /Q RESET_*.md 2>nul
del /Q SAVE_*.md 2>nul
del /Q SECURE_*.md 2>nul
del /Q START_*.md 2>nul
del /Q TEST_*.md 2>nul
del /Q TRADINGVIEW_*.md 2>nul
del /Q TROUBLESHOOT_*.md 2>nul
del /Q UPLOAD_*.md 2>nul
del /Q USE_*.md 2>nul
del /Q VERCEL_*.md 2>nul
del /Q VERIFICATION_*.md 2>nul
del /Q WHATS_*.md 2>nul

echo.
echo ========================================
echo  Cleanup Complete!
echo ========================================
echo.
echo Removed:
echo - Test and debug files
echo - Duplicate admin files
echo - Old versions
echo - Setup batch files
echo - Temporary documentation
echo.
echo Your project is now clean for GitHub!
echo.
echo Next steps:
echo 1. Review remaining files
echo 2. Run: git init
echo 3. Run: git add .
echo 4. Run: git commit -m "Initial commit"
echo 5. Run: git remote add origin https://github.com/sethdev254/bullbear-trading.git
echo 6. Run: git push -u origin main
echo.
pause
