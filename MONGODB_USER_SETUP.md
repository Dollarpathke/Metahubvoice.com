# 🔧 MongoDB Atlas User Setup Guide

## 🎯 Current Issue
Authentication failing with username `sethrone` and password `123`

## 📋 Step-by-Step Solution

### Step 1: Access MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Sign in to your account
3. Select your project (should show Cluster0)

### Step 2: Create Database User
1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Fill in the details:
   - **Authentication Method**: Password
   - **Username**: `sethrone`
   - **Password**: `123`
   - **Database User Privileges**: 
     - Select **"Built-in Role"**
     - Choose **"Read and write to any database"**
4. Click **"Add User"**

### Step 3: Configure Network Access
1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Wait for Changes
- User creation takes 1-2 minutes to propagate
- Network changes take 1-2 minutes to apply

## 🚀 Alternative: Use Existing User

If you already have a user in MongoDB Atlas:

1. Go to **Database Access**
2. Find your existing user
3. Click **"Edit"**
4. Note the username
5. Click **"Edit Password"** and set it to `123`
6. **Tell me the username** and I'll update the connection string

## 🧪 Test After Setup

Once you've created the user, run:
```bash
cd backend
node quick-test.js
```

## 💡 Common Issues

- **User not found**: Make sure you created the user in the correct project
- **Network access**: Ensure 0.0.0.0/0 is in the IP Access List
- **Propagation delay**: Wait 1-2 minutes after creating user

## 🎯 What's Next?

After you create the user `sethrone` with password `123` in MongoDB Atlas:
1. Wait 2 minutes
2. Run the test
3. If successful, we'll proceed with full setup!

**Let me know when you've created the user!** 🚀