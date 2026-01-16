# 🚀 Quick Start Guide - Bull Bear Trading

Get your Bull Bear Trading platform up and running in 10 minutes!

## Prerequisites Check

Before starting, make sure you have:
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed
- [ ] Text editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/metahub-voice.git
cd metahub-voice

# Install backend dependencies
cd backend
npm install
```

## Step 2: Configure Environment (3 minutes)

Create `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/metahub-voice

# Security
JWT_SECRET=metahub-secret-key-2025

# Email (Optional for testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@metahubvoice.com

# PayPal (Use sandbox for testing)
PAYPAL_CLIENT_ID=your-sandbox-client-id
PAYPAL_CLIENT_SECRET=your-sandbox-secret
PAYPAL_MODE=sandbox

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Step 3: Seed Database (1 minute)

```bash
# Still in backend directory
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Cleared existing courses
✅ Successfully seeded 6 courses
```

## Step 4: Start Backend (1 minute)

```bash
npm run dev
```

You should see:
```
🚀 Bull Bear Trading API running on port 5000
🎙️ Master the Markets
📍 Environment: development
✅ MongoDB connected successfully
```

## Step 5: Test Backend (1 minute)

Open a new terminal and run:

```bash
npm test
```

Or visit in browser: `http://localhost:5000/api/health`

## Step 6: Start Frontend (1 minute)

### Option A: Simple (Double-click)
- Navigate to project root
- Double-click `index.html`

### Option B: Local Server (Recommended)
```bash
# In project root directory
npx http-server -p 3000
```

Then visit: `http://localhost:3000`

## Step 7: Test the Platform (1 minute)

1. **Homepage**: Should load with courses
2. **Chatbot**: Click chat icon, send a message
3. **Sign Up**: Click "My Library" → "Sign Up"
4. **Browse Courses**: Click on any course card

## 🎉 You're Done!

Your Bull Bear Trading platform is now running!

## Quick Access Links

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Admin Dashboard**: http://localhost:3000/admin-dashboard.html

## Default Credentials

### Admin Dashboard
- Username: `admin`
- Password: `metahub2025`

### Test User (Create via signup)
- Use any email
- Password: minimum 6 characters

## Common Issues & Fixes

### Issue: "MongoDB connection error"
**Fix**: 
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string
```

### Issue: "Port 5000 already in use"
**Fix**: 
```bash
# Change PORT in .env file
PORT=5001
```

### Issue: "npm install fails"
**Fix**: 
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Issue: "Courses not showing"
**Fix**: 
```bash
# Re-seed database
npm run seed
```

## Next Steps

### For Development
1. Read [Backend API Documentation](backend/README.md)
2. Explore API endpoints with Postman
3. Customize course content
4. Modify styling in HTML files

### For Production
1. Follow [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
2. Set up MongoDB Atlas
3. Configure PayPal live credentials
4. Deploy to Vercel

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] All 6 courses display
- [ ] Chatbot responds to messages
- [ ] User can sign up
- [ ] User can log in
- [ ] Course details page works
- [ ] Purchase flow initiates
- [ ] My Library page loads
- [ ] Admin dashboard accessible

## Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run API tests
npm run seed         # Seed database with courses

# Frontend
npx http-server -p 3000    # Start local server
```

## Getting Help

### Documentation
- [README.md](README.md) - Full documentation
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Deploy guide
- [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md) - Optimize

### Support
- Email: support@metahubvoice.com
- Check console for errors
- Review backend logs

## Pro Tips

1. **Use MongoDB Compass** for visual database management
2. **Install Postman** for API testing
3. **Use VS Code** with Live Server extension
4. **Enable browser DevTools** for debugging
5. **Check Network tab** for API calls

## Development Workflow

```bash
# 1. Start MongoDB (if local)
mongod

# 2. Start backend (Terminal 1)
cd backend
npm run dev

# 3. Start frontend (Terminal 2)
npx http-server -p 3000

# 4. Make changes and test
# Backend auto-reloads with nodemon
# Frontend refresh browser to see changes
```

## What's Included

✅ 6 Pre-configured courses
✅ User authentication system
✅ Purchase management
✅ Admin dashboard
✅ Email notification system
✅ AI chatbot
✅ PayPal integration
✅ Responsive design
✅ API testing suite

## Ready to Deploy?

Once everything works locally:
1. Push code to GitHub
2. Follow [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Deploy to Vercel
4. Configure MongoDB Atlas
5. Go live! 🚀

---

**Need help?** Check the full [README.md](README.md) or contact support@metahubvoice.com

**Happy coding!** 🎉
