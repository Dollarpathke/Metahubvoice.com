# 🔐 Admin Dashboard Access

## Access URL
Open `admin-dashboard.html` in your browser or navigate to:
```
http://localhost:3000/admin-dashboard.html
```

## Default Admin Credentials

**Email:** `admin@metahubvoice.com`  
**Password:** `Admin@2025!`

## Features
- ✅ Secure password-protected login
- ✅ JWT token authentication
- ✅ Auto-logout on token expiration
- ✅ Session persistence (stays logged in)
- ✅ Modern, responsive UI

## Security Notes

### Change Default Password
For production, update the admin credentials in `backend/.env`:
```env
ADMIN_EMAIL=your-email@domain.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### JWT Secret
Change the JWT secret in production:
```env
JWT_SECRET=your-super-secret-key-here
```

## Admin Capabilities
- View total revenue, users, and purchases
- Approve/reject pending purchases
- Manage courses (add, edit, delete)
- View all user purchases
- Real-time dashboard updates

## Troubleshooting

### Can't Login?
1. Make sure backend server is running: `node backend/server.js`
2. Check console for errors (F12 in browser)
3. Verify credentials match those in `backend/.env`

### Token Expired?
- Click "Logout" and login again
- Token is automatically verified on page load

## Backend API Endpoints

### Admin Login
```
POST /api/admin/login
Body: { "email": "admin@metahubvoice.com", "password": "Admin@2025!" }
```

### Verify Token
```
GET /api/admin/verify
Headers: { "Authorization": "Bearer <token>" }
```

### Get Dashboard Stats
```
GET /api/admin/stats
Headers: { "Authorization": "Bearer <token>" }
```

---

**Note:** The admin dashboard uses the mock database by default. All data will reset when the server restarts.
