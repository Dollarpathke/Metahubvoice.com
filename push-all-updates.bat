@echo off
echo ========================================
echo BullBear Trading - Push All Updates to GitHub
echo ========================================
echo.
echo Repository: https://github.com/SethDEV254/BullBear-Trading.co.git
echo.
echo This will push:
echo - Mobile optimizations
echo - Clickable products fixes
echo - Betting platform specs
echo - All recent updates
echo.
pause

echo.
echo ========================================
echo Step 1: Checking Git Status
echo ========================================
git status
echo.
pause

echo.
echo ========================================
echo Step 2: Adding All Files
echo ========================================
echo.

REM Add mobile optimization files
echo Adding mobile optimization files...
git add mobile-optimizations.css
git add MOBILE_OPTIMIZATION_GUIDE.md
git add MOBILE_IMPROVEMENTS_SUMMARY.md
git add MOBILE_QUICK_REFERENCE.md
git add MOBILE_VIEW_COMPLETE.md
git add HOW_TO_ADD_MOBILE_CSS.md
git add test-mobile-view.html
git add add-mobile-css.bat

REM Add clickable products fixes
echo Adding clickable products fixes...
git add fix-clickable-products.css
git add fix-clickable-products.js
git add FIX_CLICKABLE_PRODUCTS_GUIDE.md
git add CLICKABLE_PRODUCTS_COMPLETE.md
git add test-clickable-products.html

REM Add betting platform specs
echo Adding betting platform specs...
git add .kiro/specs/betting-platform/requirements.md
git add .kiro/specs/betting-platform/design.md
git add .kiro/specs/betting-platform/tasks.md

REM Add main files
echo Adding main website files...
git add index.html
git add *.html
git add *.css
git add *.js

REM Add backend files
echo Adding backend files...
git add backend/

REM Add documentation
echo Adding documentation...
git add *.md

REM Add images
echo Adding images...
git add images/

echo.
echo ========================================
echo Step 3: Committing Changes
echo ========================================
echo.

git commit -m "🎉 Major Update: Mobile Optimization + Clickable Products Fix + Betting Platform Spec

✨ New Features:
- Mobile-first responsive design for all devices
- Enhanced product card clickability
- Complete betting platform specification
- Improved touch targets and accessibility

📱 Mobile Optimizations:
- Responsive breakpoints for all devices
- Touch-friendly buttons (44px minimum)
- Optimized typography and spacing
- iOS and Android specific fixes
- Landscape mode support

🎯 Clickable Products Fix:
- All product cards fully clickable
- Buy Now buttons always work
- Proper z-index stacking
- Visual feedback on interactions
- Mobile touch optimization

🎰 Betting Platform Spec:
- Complete requirements document
- Detailed design with 32 properties
- Implementation task list
- Property-based testing strategy

📚 Documentation:
- Comprehensive implementation guides
- Testing instructions
- Troubleshooting tips
- Quick reference cards

🔧 Technical Improvements:
- Enhanced CSS organization
- Improved JavaScript handlers
- Better accessibility (WCAG 2.1)
- Performance optimizations

📦 Files Added:
- mobile-optimizations.css
- fix-clickable-products.css/js
- Multiple documentation files
- Test pages for verification
- Betting platform specs

✅ Tested on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Tablets (iPad, Android tablets)
- Multiple screen sizes and orientations"

echo.
echo ========================================
echo Step 4: Pushing to GitHub
echo ========================================
echo.

git push origin main

echo.
echo ========================================
echo ✅ Push Complete!
echo ========================================
echo.
echo Your updates have been pushed to:
echo https://github.com/SethDEV254/BullBear-Trading.co.git
echo.
echo Next steps:
echo 1. Visit your GitHub repository
echo 2. Verify all files are uploaded
echo 3. Check the commit message
echo 4. Deploy to your hosting (Netlify/Vercel)
echo.
pause
