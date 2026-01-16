# BullBear Trading Platform - Project Structure

## 📁 Root Directory

```
bullbear-trading/
├── index.html                      # Homepage with featured products
├── crypto-trading-course.html      # Video course page ($500)
├── trading-indicators.html         # Premium indicators ($30/mo) - LOCKED
├── my-library.html                 # User's purchased content
├── checklist-signup.html           # Free checklist download
├── admin-dashboard.html            # Admin panel
├── admin-login.html                # Admin authentication
├── admin-pro.html                  # Advanced admin features
├── admin.html                      # Basic admin interface
├── chatbot-enhanced.js             # AI chatbot integration
├── paypal-integration.js           # PayPal payment handler
├── crypto-quickstart-checklist.pdf # Free downloadable resource
├── netlify.toml                    # Netlify deployment config
├── vercel.json                     # Vercel deployment config
├── README.md                       # Project documentation
└── .gitignore                      # Git ignore rules
```

## 📁 Backend Directory

```
backend/
├── server.js                       # Express server entry point
├── package.json                    # Node.js dependencies
├── .env.example                    # Environment variables template
├── .env                            # Environment variables (not in git)
│
├── models/
│   └── User.js                     # User schema (MongoDB)
│
├── routes/
│   ├── mpesa.js                    # M-Pesa payment routes
│   ├── paypal.js                   # PayPal payment routes
│   └── checklist.js                # Checklist download routes
│
├── utils/
│   ├── database.js                 # MongoDB connection
│   └── emailService.js             # Email notifications
│
├── mockDatabase.js                 # Mock data for testing
├── seedCourses.js                  # Database seeding script
├── test-api.js                     # API testing script
└── test-mongodb.js                 # MongoDB connection test
```

## 📁 Images Directory

```
images/
├── logo.png                        # BullBear logo
├── checklist-cover-new.png         # Checklist thumbnail
└── [product images]                # Product thumbnails
```

## 🔑 Key Files

### Frontend Pages
- **index.html** - Main landing page with product cards
- **crypto-trading-course.html** - Course with M-Pesa/PayPal payment
- **trading-indicators.html** - Locked premium content
- **my-library.html** - User dashboard for purchased items
- **checklist-signup.html** - Lead generation page

### Backend Core
- **server.js** - Express server with all routes
- **routes/mpesa.js** - M-Pesa STK Push integration
- **routes/paypal.js** - PayPal order creation/capture
- **models/User.js** - User authentication & data

### Configuration
- **.env** - API keys and secrets (not committed)
- **netlify.toml** - Netlify deployment settings
- **vercel.json** - Vercel deployment settings

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start backend:**
   ```bash
   npm start
   ```

4. **Open frontend:**
   - Open `index.html` in browser
   - Or use: `npx http-server`

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- axios - HTTP client
- cors - CORS middleware
- dotenv - Environment variables
- jsonwebtoken - JWT authentication

### Frontend
- Vanilla JavaScript (no framework)
- TradingView widgets
- PayPal SDK
- M-Pesa API integration

## 🔐 Environment Variables

Required in `backend/.env`:

```env
# Database
MONGODB_URI=mongodb+srv://...

# M-Pesa
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=...
MPESA_PASSKEY=...
MPESA_CALLBACK_URL=...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# JWT
JWT_SECRET=...

# Server
PORT=3000
```

## 📝 Notes

- All payment amounts are in USD and KES
- M-Pesa integration uses Safaricom API
- Indicators page is locked by default
- Admin credentials should be changed in production
- Use HTTPS in production for payment security

---

**Developer:** [@starico](https://twitter.com/starico)
