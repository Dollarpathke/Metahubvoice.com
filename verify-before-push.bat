@echo off
echo ========================================
echo BullBear Trading - Pre-Push Verification
echo ========================================
echo.
echo This will check your files before pushing to GitHub
echo.
pause

echo.
echo ========================================
echo 1. Checking Git Status
echo ========================================
git status
echo.

echo ========================================
echo 2. Checking for Sensitive Files
echo ========================================
echo.
echo Checking for .env file (should NOT be pushed)...
if exist backend\.env (
    echo ⚠️  WARNING: backend\.env exists!
    echo    Make sure it's in .gitignore
) else (
    echo ✅ No .env file found (good!)
)
echo.

echo Checking for .env.example (should be pushed)...
if exist backend\.env.example (
    echo ✅ backend\.env.example found (good!)
) else (
    echo ⚠️  WARNING: backend\.env.example not found
)
echo.

echo ========================================
echo 3. Checking New Files
echo ========================================
echo.
echo Mobile Optimization Files:
if exist mobile-optimizations.css (echo ✅ mobile-optimizations.css) else (echo ❌ mobile-optimizations.css MISSING)
if exist MOBILE_OPTIMIZATION_GUIDE.md (echo ✅ MOBILE_OPTIMIZATION_GUIDE.md) else (echo ❌ MOBILE_OPTIMIZATION_GUIDE.md MISSING)
if exist test-mobile-view.html (echo ✅ test-mobile-view.html) else (echo ❌ test-mobile-view.html MISSING)
echo.

echo Clickable Products Files:
if exist fix-clickable-products.css (echo ✅ fix-clickable-products.css) else (echo ❌ fix-clickable-products.css MISSING)
if exist fix-clickable-products.js (echo ✅ fix-clickable-products.js) else (echo ❌ fix-clickable-products.js MISSING)
if exist FIX_CLICKABLE_PRODUCTS_GUIDE.md (echo ✅ FIX_CLICKABLE_PRODUCTS_GUIDE.md) else (echo ❌ FIX_CLICKABLE_PRODUCTS_GUIDE.md MISSING)
if exist test-clickable-products.html (echo ✅ test-clickable-products.html) else (echo ❌ test-clickable-products.html MISSING)
echo.

echo Betting Platform Spec:
if exist .kiro\specs\betting-platform\requirements.md (echo ✅ requirements.md) else (echo ❌ requirements.md MISSING)
if exist .kiro\specs\betting-platform\design.md (echo ✅ design.md) else (echo ❌ design.md MISSING)
if exist .kiro\specs\betting-platform\tasks.md (echo ✅ tasks.md) else (echo ❌ tasks.md MISSING)
echo.

echo ========================================
echo 4. Checking File Sizes
echo ========================================
echo.
echo Checking for large files (>50MB)...
echo (Large files may cause push issues)
echo.
REM This is a basic check - you may need to manually verify
dir /s /-c | find "File(s)"
echo.

echo ========================================
echo 5. Checking .gitignore
echo ========================================
echo.
if exist .gitignore (
    echo ✅ .gitignore exists
    echo.
    echo Contents:
    type .gitignore
) else (
    echo ⚠️  WARNING: .gitignore not found!
    echo    Creating basic .gitignore...
    (
        echo node_modules/
        echo .env
        echo *.log
        echo .DS_Store
        echo Thumbs.db
    ) > .gitignore
    echo ✅ Created .gitignore
)
echo.

echo ========================================
echo 6. Summary
echo ========================================
echo.
echo Files ready to push:
git status --short
echo.

echo ========================================
echo 7. Recommendations
echo ========================================
echo.
echo Before pushing:
echo 1. ✅ Review the files listed above
echo 2. ✅ Make sure no sensitive data is included
echo 3. ✅ Verify .env is NOT in the list
echo 4. ✅ Check that all new files are present
echo 5. ✅ Test locally one more time
echo.
echo If everything looks good, run:
echo    push-all-updates.bat
echo.
pause
