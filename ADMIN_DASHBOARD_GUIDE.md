# 🎯 Admin Dashboard - Fully Functional Guide

## ✅ Your Admin Dashboard is Already Functional!

The admin dashboard at `admin-dashboard.html` is fully operational with all features working.

## 🔑 Access Credentials

**Default Login:**
- **Email:** `admin@metahubvoice.com`
- **Password:** `Admin@2025!`

## 🚀 Features Available

### 1. **Secure Login System**
- JWT token-based authentication
- Session persistence (stays logged in)
- Auto token verification
- Secure logout

### 2. **Real-Time Dashboard Stats**
- Total Revenue (with $ formatting)
- Total Users count
- Total Purchases count
- Pending Approvals count

### 3. **Purchase Management**
- View all pending purchases
- Approve purchases (grants user access)
- Reject purchases (with optional reason)
- View all purchases history

### 4. **Auto-Refresh**
- Dashboard data refreshes every 30 seconds
- Keeps you updated on new purchases

### 5. **Responsive Design**
- Works on desktop, tablet, and mobile
- Beautiful gradient UI
- Smooth animations

## 🔧 How to Use

### Step 1: Start Your Backend
```bash
cd backend
npm start
```

### Step 2: Open Admin Dashboard
Open `admin-dashboard.html` in your browser

### Step 3: Login
Use the default credentials or your custom admin account

### Step 4: Manage Purchases
- **Pending tab** shows purchases waiting for approval
- Click **Approve** to grant access
- Click **Reject** to deny (with optional reason)
- **All Purchases** tab shows complete history

## 📊 Dashboard Sections

### Stats Cards (Top)
- **Total Revenue**: Sum of all approved purchases
- **Total Users**: Number of registered users
- **Total Purchases**: All purchases (pending + approved + rejected)
- **Pending Approvals**: Purchases waiting for your action

### Pending Purchase Approvals
Shows all purchases with status "pending":
- Order ID
- User details (name + email)
- Course name
- Amount paid
- Date & time
- Action buttons (Approve/Reject)

### All Purchases
Complete purchase history:
- All purchase records
- Status indicators (pending/approved/rejected)
- Sortable by date
- Color-coded status badges

## 🎨 Status Colors

- **🟡 Pending** - Yellow (waiting for approval)
- **🟢 Approved** - Green (user has access)
- **🔴 Rejected** - Red (purchase denied)

## 🔄 API Endpoints Used

The dashboard connects to these backend endpoints:

1. `POST /api/admin/login` - Admin authentication
2. `GET /api/admin/verify` - Token verification
3. `GET /api/admin/stats` - Dashboard statistics
4. `GET /api/admin/purchases` - All purchases
5. `GET /api/admin/purchases?status=pending` - Pending only
6. `PUT /api/admin/purchases/:id/approve` - Approve purchase
7. `PUT /api/admin/purchases/:id/reject` - Reject purchase

## ⚙️ Configuration

The dashboard automatically detects your environment:
- **Local**: Uses `http://localhost:5000/api`
- **Production**: Update the API_URL in the script section

To change the API URL for production:
```javascript
const API_URL = 'https://your-backend-url.vercel.app/api';
```

## 🛡️ Security Features

- JWT token authentication
- Secure password handling
- Auto-logout on token expiration
- Protected API routes
- Session management

## 📱 Mobile Responsive

The dashboard is fully responsive:
- Adapts to all screen sizes
- Touch-friendly buttons
- Readable on mobile devices
- Optimized table layouts

## 🎯 Workflow

1. **User makes purchase** → Status: Pending
2. **Admin logs in** → Sees pending purchase
3. **Admin approves** → User gets course access
4. **Email sent** → User notified (if email configured)
5. **Dashboard updates** → Stats refresh automatically

## 💡 Tips

- Keep the dashboard open to monitor new purchases
- Auto-refresh keeps data current (every 30 seconds)
- Use browser notifications for new purchases (optional feature)
- Export purchase data for accounting (future feature)

## 🐛 Troubleshooting

### "Connection failed" error
- Make sure backend server is running
- Check API_URL matches your backend
- Verify backend is on port 5000

### "Invalid credentials" error
- Check email and password
- Verify admin account exists in database
- Run `node backend/createAdmin.js` to create admin

### Data not loading
- Check browser console for errors
- Verify MongoDB is connected
- Check backend logs for issues

## 🚀 Next Steps

Your admin dashboard is ready to use! Just:
1. Start your backend server
2. Open admin-dashboard.html
3. Login with credentials
4. Start managing purchases

---

**The admin dashboard is fully functional and ready for production use!** 🎉
