@echo off
echo 🧪 Testing MongoDB Atlas Connection...
echo.

cd backend
node test-mongodb.js

echo.
echo 💡 If connection successful, you can now:
echo    1. Start backend: npm start
echo    2. Create admin: node createAdmin.js  
echo    3. Seed courses: node seedCourses.js
echo.
pause