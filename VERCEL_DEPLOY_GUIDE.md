# 🚀 Deploy BullBear Trading Backend to Vercel

## Step 1: Create MongoDB Atlas Database (Free)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select a region close to you
6. Click **"Create Cluster"**

### Create Database User:
1. Go to **Database Access** → **Add New Database User**
2. Username: `bullbeartrading`
3. Password: Create a strong password (save it!)
4. Click **"Add User"**

### Allow Network Access:
1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Click **"Confirm"**

### Get Connection String:
1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your database user password

Example:
```
mongodb+srv://bullbeartrading:YOUR_PASSWORD@cluster0.abc123.mongodb.net/bullbear-trading?retryWrites=true&w=majority
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to backend folder:
```bash
cd backend
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables when asked.

### Option B: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Set **Root Directory** to `backend`
6. Click **"Deploy"**

---

## Step 3: Add Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add these variables:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://bullbeartrading:YOUR_PASSWORD@cluster0.xxx.mongodb.net/bullbear-trading?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-2025` |
| `PAYPAL_CLIENT_ID` | `EHyxXrMCDAjeeNIFxhIVhg9b8I7PffoH0nPeoHWN7VJUD6Gfw1yHYrOqOiN5lbm5EKLXty5ukbsnLGIS` |
| `PAYPAL_CLIENT_SECRET` | `your_paypal_secret` |
| `PAYPAL_MODE` | `sandbox` |
| `FRONTEND_URL` | `https://your-frontend-url.com` |
| `ADMIN_EMAIL` | `admin@bullbeartrading.com` |
| `ADMIN_PASSWORD` | `Admin@2025!` |

---

## Step 4: Test Your Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-vercel-url.vercel.app/api/health

# Get courses
curl https://your-vercel-url.vercel.app/api/courses

# PayPal config
curl https://your-vercel-url.vercel.app/api/paypal/config
```

---

## Step 5: Update Frontend API URL

Update `paypal-integration.js` with your Vercel URL:

```javascript
this.apiUrl = 'https://your-vercel-url.vercel.app/api/paypal';
```

---

## 🎉 Done!

Your BullBear Trading backend is now live with:
- ✅ MongoDB Atlas database
- ✅ PayPal payment integration
- ✅ User authentication
- ✅ Course management
- ✅ Admin dashboard API

---

## Troubleshooting

### MongoDB Connection Issues:
- Verify IP whitelist includes 0.0.0.0/0
- Check username/password are correct
- Ensure connection string has correct database name

### Vercel Deployment Issues:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `vercel.json` is in the backend folder

### PayPal Issues:
- Use sandbox mode for testing
- Create test accounts at developer.paypal.com
- Check client ID is correct