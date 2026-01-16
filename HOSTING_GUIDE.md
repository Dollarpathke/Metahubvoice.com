# Metahub Voice Hosting Guide

Complete guide to host your website and backend.

## 🎯 Quick Start - Free Hosting (5 minutes)

### Frontend: GitHub Pages (FREE)

Your frontend is already on GitHub! Just enable GitHub Pages:

1. **Go to your repository:**
   https://github.com/Dollarpathke/Metahubvoice.com

2. **Enable GitHub Pages:**
   - Click "Settings" tab
   - Scroll to "Pages" in left sidebar
   - Under "Source", select branch: **main**
   - Click "Save"

3. **Your site will be live at:**
   `https://dollarpathke.github.io/Metahubvoice.com/`

   ✅ **Done! Your website is now live!**

---

## 🚀 Full Stack Hosting Options

### Option 1: Vercel (Recommended - FREE)

**Best for:** Easy deployment, automatic updates

#### Frontend on Vercel:

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Import Project:**
   - Click "Add New" → "Project"
   - Select `Metahubvoice.com` repository
   - Click "Deploy"
4. **Done!** Your site is live at: `metahubvoice.vercel.app`

#### Backend on Vercel:

1. Create `vercel.json` in backend folder (already created below)
2. Deploy backend separately
3. Update frontend to use backend URL

**Cost:** FREE (Hobby plan)

---

### Option 2: Netlify (FREE)

**Best for:** Simple static sites, forms

1. **Go to:** https://netlify.com
2. **Sign up** with GitHub
3. **New site from Git:**
   - Connect to GitHub
   - Select `Metahubvoice.com`
   - Click "Deploy"
4. **Custom domain:** Add `metahubvoice.com` in settings

**Cost:** FREE (Starter plan)

---

### Option 3: Render (FREE for Backend)

**Best for:** Backend API hosting

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **New Web Service:**
   - Connect repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
4. **Environment variables:** Add from `.env.example`

**Cost:** FREE (with limitations)

---

### Option 4: Railway (Recommended for Backend)

**Best for:** Full-stack apps, databases

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **New Project:**
   - Deploy from GitHub repo
   - Select `backend` folder
4. **Add MongoDB:**
   - Click "New" → "Database" → "MongoDB"
   - Copy connection string to environment variables

**Cost:** $5/month (includes database)

---

### Option 5: Heroku (Popular)

**Best for:** Production apps

#### Deploy Backend:

```bash
# Install Heroku CLI
# Go to: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create metahub-voice-api

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
cd backend
git init
heroku git:remote -a metahub-voice-api
git add .
git commit -m "Deploy backend"
git push heroku main
```

**Cost:** $7/month (Eco plan)

---

### Option 6: Custom Domain Hosting

**For:** metahubvoice.com

#### Buy Domain:
- **Namecheap:** https://namecheap.com (~$10/year)
- **GoDaddy:** https://godaddy.com (~$12/year)
- **Google Domains:** https://domains.google (~$12/year)

#### Point Domain to Hosting:

**For GitHub Pages:**
1. In repository settings → Pages
2. Add custom domain: `metahubvoice.com`
3. In domain registrar, add DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: CNAME
   Host: www
   Value: dollarpathke.github.io
   ```

**For Vercel/Netlify:**
- Follow their custom domain setup wizard
- They provide DNS records automatically

---

## 💾 Database Hosting

### MongoDB Atlas (FREE)

1. **Go to:** https://mongodb.com/cloud/atlas
2. **Sign up** for free
3. **Create cluster:**
   - Choose FREE tier (M0)
   - Select region closest to you
4. **Create database user**
5. **Whitelist IP:** 0.0.0.0/0 (allow all)
6. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Add to backend `.env` file

**Cost:** FREE (512MB storage)

---

## 🔧 Environment Setup

### Backend Environment Variables

Create `.env` file in backend folder:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-key-change-this
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=info@metahubacademy.com
EMAIL_PASSWORD=your-email-app-password
FRONTEND_URL=https://metahubvoice.com
```

---

## 📊 Recommended Setup (Best Performance)

### Frontend:
- **Vercel** or **Netlify** (FREE)
- Custom domain: metahubvoice.com

### Backend:
- **Railway** ($5/month) - Includes MongoDB
- Or **Render** (FREE) + **MongoDB Atlas** (FREE)

### Total Cost: 
- **FREE** (Render + MongoDB Atlas)
- **$5/month** (Railway with database)
- **$10-15/month** (with custom domain)

---

## ✅ Quick Deploy Checklist

- [ ] Enable GitHub Pages
- [ ] Sign up for Vercel/Netlify
- [ ] Deploy frontend
- [ ] Sign up for MongoDB Atlas
- [ ] Create database
- [ ] Sign up for Railway/Render
- [ ] Deploy backend
- [ ] Add environment variables
- [ ] Test API endpoints
- [ ] Buy custom domain (optional)
- [ ] Configure DNS
- [ ] Enable HTTPS

---

## 🆘 Need Help?

**Contact:**
- Email: info@metahubacademy.com
- Phone: +1 (973)-8197-530

**Resources:**
- GitHub Pages: https://pages.github.com
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app

---

**🎙️ Metahub Voice - Master the Markets**
