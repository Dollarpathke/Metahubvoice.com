# 🚨 FIX: MongoDB Connection Error

## The Problem
You're getting: `Operation users.findOne() buffering timed out after 10000ms`

**This means:** MongoDB is not connected.

---

## ✅ QUICK FIX (5 Minutes)

### Step 1: Test Current Connection

```bash
cd backend
npm run test-db
```

This will tell you exactly what's wrong.

---

### Step 2: Choose Your Solution

#### 🌟 OPTION A: MongoDB Atlas (RECOMMENDED - No Installation)

**Why?** Free, fast, no installation needed!

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create free cluster** (M0 tier)
3. **Create database user:**
   - Username: `metahub_admin`
   - Password: (autogenerate and copy it)
4. **Allow network access:**
   - Click "Allow Access from Anywhere"
5. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the string
6. **Update backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://metahub_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/metahub-voice?retryWrites=true&w=majority
   ```
   Replace `YOUR_PASSWORD` with your actual password

**Detailed guide:** See `MONGODB_SETUP.md`

---

#### 🔧 OPTION B: Install MongoDB Locally

**Windows:**
```bash
# Download and install from:
https://www.mongodb.com/try/download/community

# After installation, start MongoDB:
net start MongoDB
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

Then your `.env` should have:
```env
MONGODB_URI=mongodb://localhost:27017/metahub-voice
```

---

### Step 3: Test Again

```bash
cd backend
npm run test-db
```

You should see:
```
✅ SUCCESS! MongoDB connected successfully!
```

---

### Step 4: Create Admin & Start

```bash
# Create admin user
npm run create-admin

# Seed courses
npm run seed

# Start server
npm run dev
```

---

## 🎯 Quick Commands

```bash
# Test MongoDB connection
cd backend
npm run test-db

# If connection works, then:
npm run create-admin
npm run seed
npm run dev
```

---

## 🆘 Still Not Working?

### Error: "Authentication failed"
- Wrong password in connection string
- Check MongoDB Atlas credentials

### Error: "ECONNREFUSED"
- MongoDB not running locally
- Start with: `mongod` or `net start MongoDB`

### Error: "Network timeout"
- Check internet connection
- Verify Network Access in MongoDB Atlas

### Error: "Connection string invalid"
- Check for typos in .env file
- Make sure no extra spaces

---

## 📞 Need More Help?

Run this to see detailed diagnostics:
```bash
cd backend
npm run test-db
```

The error message will tell you exactly what to fix!

---

## 🎉 Once Fixed

After MongoDB connects, you'll be able to:
- ✅ Create admin user
- ✅ Seed courses
- ✅ Start the server
- ✅ Use the admin dashboard
- ✅ Test all features

---

**Recommended:** Use MongoDB Atlas - it's the fastest way to get started!

Just go to: https://www.mongodb.com/cloud/atlas/register
