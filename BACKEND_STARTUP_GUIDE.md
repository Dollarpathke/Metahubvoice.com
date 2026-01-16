# 🚀 Backend Startup Guide - Port 5000

## ✅ Backend Configuration

### Current Setup:
- **Port:** 5000
- **URL:** http://localhost:5000
- **Status:** Configured and ready

### Environment File:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
```

## 🎯 Quick Start Options

### Option 1: One-Click Start Everything
```
Double-click: START_EVERYTHING.bat
```
This will:
1. Start backend on port 5000
2. Open frontend (index.html)
3. Open admin dashboard
4. All in one click!

### Option 2: Start Backend Only
```
Double-click: START_BACKEND.bat
```

### Option 3: Manual Start
```bash
cd backend
npm install  # First time only
npm start
```

### Option 4: Check if Running
```
Double-click: check-backend.bat
```

## 🔍 Verify Backend is Running

### Method 1: Browser
Open: http://localhost:5000/api/health

Should see:
```json
{
  "status": "success",
  "message": "BullBear Trading API is running",
  "timestamp": "2025-01-15T..."
}
```

### Method 2: Command Line
```bash
curl http://localhost:5000/api/health
```

### Method 3: Check Script
```
Double-click: check-backend.bat
```

## 📡 API Endpoints

### Health Check:
```
GET http://localhost:5000/api/health
```

### Authentication:
```
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
```

### Checklist Email:
```
POST http://localhost:5000/api/checklist/send-email
```

### Admin:
```
GET  http://localhost:5000/api/admin/users
GET  http://localhost:5000/api/admin/purchases
POST http://localhost:5000/api/admin/approve-purchase
```

### Purchases:
```
GET  http://localhost:5000/api/purchases/my-purchases
POST http://localhost:5000/api/purchases/create
```

## 🔧 Troubleshooting

### Port 5000 Already in Use?

**Check what's using port 5000:**
```bash
netstat -ano | findstr :5000
```

**Kill the process:**
```bash
taskkill /PID [process_id] /F
```

**Or change port in backend/.env:**
```env
PORT=5001
```

### Backend Won't Start?

**1. Install dependencies:**
```bash
cd backend
npm install
```

**2. Check Node version:**
```bash
node --version
# Should be 18.x or higher
```

**3. Check for errors:**
```bash
cd backend
npm start
# Read error messages
```

**4. Check .env file:**
```bash
# Make sure backend/.env exists
# Copy from .env.example if needed
```

### Connection Refused?

**Make sure backend is running:**
```bash
# Should see:
🚀 Bull Bear Trading API running on port 5000
🎙️ Master the Markets
📍 Environment: development
```

**Check firewall:**
- Allow Node.js through Windows Firewall
- Allow port 5000

## 📊 Backend Features

### Currently Active:
✅ User authentication
✅ Purchase management
✅ Email service (checklist)
✅ Admin routes
✅ CORS enabled
✅ Rate limiting
✅ MongoDB connection
✅ Mock database fallback

### API Status:
- Health check: ✅ Working
- Auth routes: ✅ Working
- Checklist email: ✅ Working
- Admin routes: ✅ Working
- Purchase routes: ✅ Working

## 🔐 Security

### Current Settings:
- CORS: Enabled for all origins (development)
- Rate Limit: 100 requests per 15 minutes
- JWT Secret: Set in .env
- Admin Password: Admin@2025!

### For Production:
1. Change JWT_SECRET
2. Change ADMIN_PASSWORD
3. Restrict CORS origins
4. Enable HTTPS
5. Use environment variables
6. Add request validation
7. Enable logging

## 📝 Logs

### Backend logs show:
- Server start message
- Port number
- Environment
- Database connection status
- API requests
- Errors

### View logs:
```bash
# In backend terminal window
# All logs appear in real-time
```

## 🔄 Restart Backend

### If backend is running:
1. Go to backend terminal window
2. Press Ctrl+C
3. Run: `npm start`

### Or:
1. Close backend window
2. Double-click START_BACKEND.bat

## 🌐 Frontend Connection

### Frontend files connect to backend:
- `checklist-signup.html` - Email service
- `crypto-trading-course.html` - Purchase API
- `my-library.html` - Purchase retrieval
- `admin-interactive.html` - Admin API

### API URL in frontend:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 📦 Dependencies

### Required packages (already installed):
- express - Web framework
- cors - Cross-origin requests
- dotenv - Environment variables
- mongoose - MongoDB
- nodemailer - Email service
- bcryptjs - Password hashing
- jsonwebtoken - Authentication
- compression - Response compression
- express-rate-limit - Rate limiting

### Install all:
```bash
cd backend
npm install
```

## 🎯 Quick Commands

### Start backend:
```bash
cd backend && npm start
```

### Install dependencies:
```bash
cd backend && npm install
```

### Test API:
```bash
curl http://localhost:5000/api/health
```

### Check port:
```bash
netstat -ano | findstr :5000
```

## 📱 Development vs Production

### Development (Current):
- Port: 5000
- Database: MongoDB Atlas
- CORS: All origins
- Logging: Console
- Mock DB: Fallback enabled

### Production (Deploy):
- Port: From hosting provider
- Database: Production MongoDB
- CORS: Specific origins
- Logging: File/Service
- Mock DB: Disabled

## ✅ Startup Checklist

Before starting backend:
- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file exists
- [ ] Port 5000 available
- [ ] MongoDB connection (optional)

After starting backend:
- [ ] See startup message
- [ ] No error messages
- [ ] Health check works
- [ ] Frontend can connect

## 🚀 Ready to Go!

### Quick Start:
1. **Double-click:** `START_EVERYTHING.bat`
2. **Wait:** 5 seconds for backend to start
3. **Use:** Frontend and admin automatically open
4. **Done!** Everything is running

### Or Step by Step:
1. **Start backend:** `START_BACKEND.bat`
2. **Check status:** `check-backend.bat`
3. **Open frontend:** `index.html`
4. **Open admin:** `admin-login.html`

---

**Backend Port:** 5000 ✅
**Status:** Configured and ready
**Quick Start:** Double-click `START_EVERYTHING.bat`

🎉 **Your backend is ready to run on port 5000!**
