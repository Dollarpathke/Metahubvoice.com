# 🚀 Deploy Metahub Voice NOW

You have MongoDB and Vercel accounts ready. Follow these exact steps:

---

## 📝 What You Need:

From MongoDB Atlas:
- [ ] Connection string (looks like: `mongodb+srv://metahub_admin:PASSWORD@...`)
- [ ] Database password

From Vercel:
- [ ] Signed in with GitHub

---

## 🎯 DEPLOY FRONTEND (2 minutes)

### Go to Vercel:
https://vercel.com/new

### Steps:
1. **Import Git Repository**
   - Find "Metahubvoice.com"
   - Click "Import"

2. **Configure Project:**
   - Project Name: `metahub-voice`
   - Framework: Other
   - Root Directory: `./`
   - Click "Deploy"

3. **Wait 1-2 minutes**

4. **Get Your URL:**
   - Copy the URL (e.g., `https://metahub-voice.vercel.app`)
   - **SAVE THIS URL!**

✅ **Frontend is LIVE!**

---

## 🔧 DEPLOY BACKEND (3 minutes)

### Go to Vercel:
https://vercel.com/new

### Steps:
1. **Import Same Repository Again**
   - Find "Metahubvoice.com"
   - Click "Import"

2. **Configure Project:**
   - Project Name: `metahub-voice-api`
   - Framework: Other
   - Root Directory: Click "Edit" → Select "**backend**"

3. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```
   NODE_ENV = production
   MONGODB_URI = (paste your MongoDB connection string)
   JWT_SECRET = metahub_voice_secret_key_2025_secure
   EMAIL_HOST = smtp.gmail.com
   EMAIL_PORT = 587
   EMAIL_USER = info@metahubacademy.com
   EMAIL_PASSWORD = (your email password)
   FRONTEND_URL = (paste your frontend URL from above)
   PORT = 5000
   ```

4. **Click "Deploy"**

5. **Wait 2-3 minutes**

6. **Get Your API URL:**
   - Copy the URL (e.g., `https://metahub-voice-api.vercel.app`)
   - **SAVE THIS URL!**

✅ **Backend is LIVE!**

---

## ✅ VERIFY DEPLOYMENT

### Test Frontend:
Visit your frontend URL and check:
- [ ] Page loads correctly
- [ ] Images display
- [ ] Navigation works
- [ ] Chat bot appears

### Test Backend:
Visit: `https://your-backend-url.vercel.app/api/health`

Should see:
```json
{
  "status": "success",
  "message": "Metahub Voice API is running"
}
```

### Test Database:
Check Vercel backend logs for:
```
✅ MongoDB connected successfully
```

---

## 🎉 YOU'RE LIVE!

### Your URLs:
- **Website:** https://metahub-voice.vercel.app
- **API:** https://metahub-voice-api.vercel.app
- **GitHub:** https://github.com/Dollarpathke/Metahubvoice.com

### Share Your Site:
- Twitter/X: @metahubvoice
- Instagram: @metahubvoice
- TikTok: @metahubvoice

---

## 🔄 Future Updates

To update your site:

```bash
# Make changes to your files
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically redeploy! ✨

---

## 🆘 Issues?

### "MongoDB connection failed"
- Check connection string has correct password
- Verify IP whitelist includes 0.0.0.0/0

### "Vercel build failed"
- Check Vercel logs
- Verify package.json is correct
- Check environment variables

### Need Help?
- Email: info@metahubacademy.com
- Phone: +1 (973)-8197-530

---

**🎙️ Master the Markets - Now Live!**
