# Vercel + MongoDB Atlas Deployment Guide

Complete setup for Bull Bear Trading on Vercel with MongoDB Atlas.

---

## 🗄️ STEP 1: Setup MongoDB Atlas (5 minutes)

### 1.1 Create Account
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up with Google or Email
- Choose "FREE" plan

### 1.2 Create Database Cluster
1. Click "**Build a Database**"
2. Choose "**M0 FREE**" tier
3. Select region: **AWS / N. Virginia (us-east-1)** (closest to Vercel)
4. Cluster Name: `metahub-voice`
5. Click "**Create**"

### 1.3 Create Database User
1. **Username:** `metahub_admin`
2. **Password:** Click "Autogenerate Secure Password" (SAVE THIS!)
3. Click "**Create User**"

### 1.4 Setup Network Access
1. Click "**Add My Current IP Address**"
2. Also add: `0.0.0.0/0` (allows Vercel to connect)
   - Click "Add IP Address"
   - Enter: `0.0.0.0/0`
   - Description: "Vercel Access"
   - Click "Confirm"

### 1.5 Get Connection String
1. Click "**Connect**"
2. Choose "**Drivers**"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://metahub_admin:<password>@metahub-voice.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. **SAVE THIS CONNECTION STRING!**

✅ **MongoDB Atlas Setup Complete!**

---

## 🚀 STEP 2: Deploy Frontend to Vercel (3 minutes)

### 2.1 Sign Up for Vercel
- Go to: https://vercel.com/signup
- Click "**Continue with GitHub**"
- Authorize Vercel

### 2.2 Import Project
1. Click "**Add New...**" → "**Project**"
2. Find "**Metahubvoice.com**" repository
3. Click "**Import**"

### 2.3 Configure Project
- **Framework Preset:** Other
- **Root Directory:** `./` (leave as is)
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)
- Click "**Deploy**"

### 2.4 Wait for Deployment
- Takes 1-2 minutes
- You'll see: ✅ "Congratulations!"

### 2.5 Get Your URL
Your site is now live at:
```
https://metahubvoice-com.vercel.app
```
(or similar - Vercel will show you the exact URL)

✅ **Frontend Deployed!**

---

## 🔧 STEP 3: Deploy Backend to Vercel (5 minutes)

### 3.1 Create New Project for Backend
1. Go back to Vercel dashboard
2. Click "**Add New...**" → "**Project**"
3. Select "**Metahubvoice.com**" again
4. Click "**Import**"

### 3.2 Configure Backend
- **Framework Preset:** Other
- **Root Directory:** Click "Edit" → Select "**backend**"
- **Build Command:** `npm install`
- **Output Directory:** (leave empty)
- **Install Command:** `npm install`

### 3.3 Add Environment Variables
Click "**Environment Variables**" and add these:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | (paste your MongoDB connection string) |
| `JWT_SECRET` | (generate random string: `metahub_voice_secret_2025_xyz123`) |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `info@metahubacademy.com` |
| `EMAIL_PASSWORD` | (your email app password) |
| `FRONTEND_URL` | (your frontend Vercel URL from Step 2.5) |
| `PORT` | `5000` |

### 3.4 Deploy Backend
1. Click "**Deploy**"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://metahubvoice-backend.vercel.app`

✅ **Backend Deployed!**

---

## 🔗 STEP 4: Connect Frontend to Backend (2 minutes)

### 4.1 Update Frontend Configuration

You need to update your frontend to use the backend API URL.

**Backend API URL:** `https://metahubvoice-backend.vercel.app`

### 4.2 Test Your API

Visit: `https://metahubvoice-backend.vercel.app/api/health`

You should see:
```json
{
  "status": "success",
  "message": "Bull Bear Trading API is running",
  "timestamp": "2025-01-09T..."
}
```

✅ **Everything Connected!**

---

## 🌐 STEP 5: Add Custom Domain (Optional)

### 5.1 In Vercel Dashboard
1. Go to your frontend project
2. Click "**Settings**" → "**Domains**"
3. Add domain: `metahubvoice.com`
4. Add domain: `www.metahubvoice.com`

### 5.2 Update DNS (at your domain registrar)
Vercel will show you DNS records to add:

**For metahubvoice.com:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.metahubvoice.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

✅ **Custom Domain Connected!**

---

## 📊 Your Deployment Summary

### Frontend:
- **URL:** https://metahubvoice-com.vercel.app
- **Custom:** https://metahubvoice.com (after domain setup)
- **Auto-deploy:** Yes (on git push)

### Backend API:
- **URL:** https://metahubvoice-backend.vercel.app
- **Endpoints:**
  - `/api/health` - Health check
  - `/api/auth/signup` - User registration
  - `/api/auth/login` - User login
  - `/api/courses` - Get courses
  - `/api/purchases` - Manage purchases

### Database:
- **Provider:** MongoDB Atlas
- **Tier:** M0 (FREE)
- **Storage:** 512MB
- **Region:** us-east-1

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Environment variables added
- [ ] API health check working
- [ ] Frontend can access backend
- [ ] Custom domain added (optional)

---

## 🧪 Testing Your Deployment

### Test Frontend:
Visit: https://metahubvoice-com.vercel.app

### Test Backend:
```bash
# Health check
curl https://metahubvoice-backend.vercel.app/api/health

# Get courses
curl https://metahubvoice-backend.vercel.app/api/courses
```

### Test Database Connection:
Check Vercel logs for "MongoDB connected successfully"

---

## 🔄 Updating Your Site

### Automatic Updates:
Every time you push to GitHub, Vercel automatically redeploys!

```bash
git add .
git commit -m "Update website"
git push origin main
```

Vercel will:
1. Detect the push
2. Build your project
3. Deploy automatically
4. Update your live site

---

## 📈 Monitoring

### Vercel Dashboard:
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### MongoDB Atlas Dashboard:
- Monitor database usage
- View connection stats
- Check query performance
- Manage backups

---

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check MongoDB connection string
- Verify IP whitelist includes 0.0.0.0/0
- Check environment variables in Vercel

### "API not responding"
- Check Vercel function logs
- Verify environment variables
- Check MongoDB Atlas is running

### "CORS errors"
- Update FRONTEND_URL in backend env variables
- Check CORS settings in server.js

---

## 💰 Costs

### Current Setup (FREE):
- Vercel: FREE (Hobby plan)
- MongoDB Atlas: FREE (M0 tier)
- **Total: $0/month**

### Upgrade Options:
- Vercel Pro: $20/month (better performance)
- MongoDB M10: $0.08/hour (~$57/month) (more storage)
- Custom domain: $10-15/year

---

## 📞 Support

**Bull Bear Trading:**
- Email: info@metahubacademy.com
- Phone: +1 (973)-8197-530

**Platform Support:**
- Vercel: https://vercel.com/support
- MongoDB: https://support.mongodb.com

---

## 🎉 Congratulations!

Your Bull Bear Trading platform is now live on:
- ✅ Vercel (Frontend & Backend)
- ✅ MongoDB Atlas (Database)
- ✅ GitHub (Version Control)

**🎙️ Master the Markets is now online!**

---

**Built by Seth Cryptolord & Starico Isige John**
