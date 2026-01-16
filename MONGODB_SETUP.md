# 🗄️ MongoDB Setup Guide - Quick & Easy

## Problem: MongoDB Not Installed

You're seeing the error because MongoDB is not running on your computer.

## ✅ Solution: Use MongoDB Atlas (Free Cloud Database)

**No installation needed! Takes 5 minutes.**

---

## Step-by-Step Setup

### 1. Create MongoDB Atlas Account (2 minutes)

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with:
   - Email
   - Google account
   - Or GitHub account

### 2. Create a Free Cluster (2 minutes)

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** (the free tier)
3. Select a cloud provider (AWS recommended)
4. Choose a region close to you
5. Click **"Create Cluster"**
6. Wait 1-3 minutes for cluster to be created

### 3. Create Database User (1 minute)

1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `metahub_admin`
5. Password: Click **"Autogenerate Secure Password"** (copy it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 4. Allow Network Access (30 seconds)

1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### 5. Get Connection String (1 minute)

1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://metahub_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied earlier

### 6. Update Your .env File (30 seconds)

Open `backend/.env` and update the MONGODB_URI line:

```env
MONGODB_URI=mongodb+srv://metahub_admin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/metahub-voice?retryWrites=true&w=majority
```

**Important:** 
- Replace `YOUR_PASSWORD_HERE` with your actual password
- Add `/metahub-voice` before the `?` to specify the database name

---

## 🚀 Now Try Again

```bash
cd backend

# Create admin user
npm run create-admin

# Should see:
# ✅ Connected to MongoDB
# ✅ Admin user created successfully!
```

---

## 🎯 Alternative: Install MongoDB Locally

If you prefer to install MongoDB on your computer:

### Windows
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install as Windows Service
5. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## ✅ Verify Connection

After setting up MongoDB Atlas or installing locally, test the connection:

```bash
cd backend
node -e "const mongoose = require('mongoose'); require('dotenv').config(); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(err => { console.error('❌ Failed:', err.message); process.exit(1); });"
```

---

## 🆘 Still Having Issues?

### Common Problems:

**1. "Authentication failed"**
- Check password is correct in connection string
- Make sure you replaced `<password>` with actual password
- Password should NOT have special characters like `@`, `#`, `%` (or URL encode them)

**2. "Network timeout"**
- Check you added your IP to Network Access
- Try "Allow Access from Anywhere" for testing

**3. "Database name not specified"**
- Make sure connection string has `/metahub-voice` before the `?`
- Example: `...mongodb.net/metahub-voice?retryWrites=true...`

**4. "Connection string is invalid"**
- Make sure you copied the full string
- Check for any extra spaces or line breaks

---

## 📞 Need Help?

If you're still stuck, share:
1. The error message you're seeing
2. Whether you're using Atlas or local MongoDB
3. Your connection string (WITHOUT the password)

---

## 🎉 Once Connected

After MongoDB is connected, you can:

```bash
# Create admin user
npm run create-admin

# Seed courses
npm run seed

# Start server
npm run dev

# Run tests
npm test
```

---

**Recommended:** Use MongoDB Atlas for development - it's free, fast, and requires no installation!
