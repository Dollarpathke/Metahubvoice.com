# 🔐 Secure Admin Authentication Setup Guide

## Overview

The admin dashboard now uses **secure backend authentication** with JWT tokens instead of client-side credentials.

---

## 🎯 What Changed

### Before (Insecure)
- ❌ Hardcoded credentials in frontend
- ❌ Client-side only authentication
- ❌ No token validation
- ❌ Anyone could access with default password

### After (Secure)
- ✅ Backend JWT authentication
- ✅ Database-stored admin users
- ✅ Token-based sessions
- ✅ Role-based access control
- ✅ Secure API endpoints

---

## 🚀 Quick Setup

### Step 1: Create Admin User

```bash
cd backend

# Option A: Use default credentials from .env
npm run create-admin

# Option B: Set custom credentials first
# Edit .env file:
# ADMIN_EMAIL=your-admin@email.com
# ADMIN_PASSWORD=YourSecurePassword123!
npm run create-admin
```

**Output:**
```
✅ Connected to MongoDB
✅ Admin user created successfully!

📧 Admin Credentials:
Email: admin@metahubvoice.com
Password: Admin@2025!

⚠️  IMPORTANT: Change the password after first login!
```

### Step 2: Start Backend

```bash
npm run dev
```

### Step 3: Login to Admin Dashboard

1. Open `admin-dashboard.html` in browser
2. Enter admin email and password
3. Click "Login"
4. You're in! 🎉

---

## 📋 Default Credentials

**Email:** `admin@metahubvoice.com`  
**Password:** `Admin@2025!`

⚠️ **IMPORTANT:** Change these in production!

---

## 🔧 Configuration

### Environment Variables

Add to `backend/.env`:

```env
# Admin Configuration
ADMIN_EMAIL=admin@metahubvoice.com
ADMIN_PASSWORD=Admin@2025!

# JWT Secret (required)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Custom Admin Credentials

Edit `.env` before running `npm run create-admin`:

```env
ADMIN_EMAIL=myemail@company.com
ADMIN_PASSWORD=MySecurePassword123!
```

---

## 🔐 Security Features

### 1. JWT Token Authentication
- Tokens expire in 7 days
- Stored securely in localStorage
- Validated on every request

### 2. Role-Based Access Control
- Users have `role` field: `user` or `admin`
- Only admins can access admin endpoints
- Middleware checks role on protected routes

### 3. Password Security
- Passwords hashed with bcrypt
- 10 salt rounds
- Never stored in plain text

### 4. Protected API Endpoints
All admin endpoints require authentication:
- `POST /api/admin/login` - Login (public)
- `GET /api/admin/verify` - Verify token
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/purchases` - Get purchases
- `GET /api/admin/users` - Get users
- `PUT /api/admin/purchases/:id/approve` - Approve purchase
- `PUT /api/admin/purchases/:id/reject` - Reject purchase
- `PUT /api/admin/users/:id/role` - Update user role

---

## 📚 API Documentation

### Admin Login

**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "email": "admin@metahubvoice.com",
  "password": "Admin@2025!"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Admin login successful",
  "data": {
    "user": {
      "id": "user-id",
      "email": "admin@metahubvoice.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Verify Token

**Endpoint:** `GET /api/admin/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "message": "Token is valid",
  "data": {
    "user": {
      "id": "user-id",
      "email": "admin@metahubvoice.com",
      "role": "admin"
    }
  }
}
```

### Get Statistics

**Endpoint:** `GET /api/admin/stats`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "totalRevenue": 2500,
    "totalUsers": 15,
    "totalAdmins": 1,
    "totalPurchases": 8,
    "pendingApprovals": 2,
    "recentPurchases": [...]
  }
}
```

### Approve Purchase

**Endpoint:** `PUT /api/admin/purchases/:id/approve`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "message": "Purchase approved successfully",
  "data": {
    "purchase": {...}
  }
}
```

### Reject Purchase

**Endpoint:** `PUT /api/admin/purchases/:id/reject`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "reason": "Payment verification failed"
}
```

---

## 👥 Managing Admins

### Create Additional Admin

**Option 1: Using Script**
```bash
# Edit .env with new admin details
ADMIN_EMAIL=newadmin@company.com
ADMIN_PASSWORD=SecurePass123!

# Run script
npm run create-admin
```

**Option 2: Update Existing User**
```bash
# In MongoDB or using API
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 3: Using API Endpoint**
```http
PUT /api/admin/users/:userId/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin"
}
```

### Remove Admin Privileges

```http
PUT /api/admin/users/:userId/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "user"
}
```

---

## 🔄 Password Management

### Change Admin Password

**Option 1: Recreate Admin**
```bash
# Delete existing admin from database
# Update .env with new password
# Run create-admin script
npm run create-admin
```

**Option 2: Direct Database Update**
```javascript
// In MongoDB shell or script
const bcrypt = require('bcryptjs');
const newPassword = await bcrypt.hash('NewPassword123!', 10);

db.users.updateOne(
  { email: "admin@metahubvoice.com" },
  { $set: { password: newPassword } }
);
```

**Option 3: Create Password Reset Endpoint** (Recommended for production)

---

## 🧪 Testing Admin Authentication

### Test Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@metahubvoice.com",
    "password": "Admin@2025!"
  }'
```

### Test Protected Endpoint
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚨 Troubleshooting

### Issue: "Admin user already exists"

**Solution:** The admin is already created. Use existing credentials or delete and recreate:

```javascript
// In MongoDB
db.users.deleteOne({ email: "admin@metahubvoice.com" });
```

Then run `npm run create-admin` again.

### Issue: "Invalid credentials"

**Solutions:**
1. Check email and password are correct
2. Verify admin user exists in database
3. Check user has `role: "admin"`
4. Ensure password wasn't changed manually

### Issue: "Access denied. Admin privileges required"

**Solution:** User exists but doesn't have admin role:

```javascript
// Update user role
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
);
```

### Issue: "Token expired"

**Solution:** Login again to get a new token. Tokens expire after 7 days.

### Issue: "Cannot read admin dashboard"

**Solution:** 
1. Ensure backend is running
2. Check API_URL in admin-dashboard.html matches your backend
3. Check browser console for errors
4. Verify CORS is configured correctly

---

## 🔒 Production Security Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Implement rate limiting on login endpoint
- [ ] Add login attempt tracking
- [ ] Implement account lockout after failed attempts
- [ ] Add two-factor authentication (optional)
- [ ] Set up monitoring and alerts
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## 📁 New Files Created

1. **backend/routes/admin.js** - Admin API routes
2. **backend/middleware/auth.js** - Authentication middleware
3. **backend/createAdmin.js** - Admin creation script
4. **ADMIN_SETUP_GUIDE.md** - This guide

---

## 🎯 Next Steps

1. ✅ Create admin user: `npm run create-admin`
2. ✅ Start backend: `npm run dev`
3. ✅ Login to admin dashboard
4. ✅ Change default password
5. ✅ Test all admin features
6. ✅ Deploy to production

---

## 📞 Support

Need help?
- Email: support@metahubvoice.com
- Check backend logs for errors
- Review API responses
- Test with curl/Postman

---

**Metahub Voice** - Secure Admin Authentication 🔐

*Your admin dashboard is now protected with enterprise-grade security!* 🚀
