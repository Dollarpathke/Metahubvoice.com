# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Clone & Install
```bash
git clone https://github.com/sethdev254/bullbear-trading.git
cd bullbear-trading
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=your_mongodb_uri
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
JWT_SECRET=your_random_secret
```

### 3. Start Backend
```bash
npm start
```

### 4. Open Frontend
Open `index.html` in your browser or:
```bash
npx http-server
```

## 🔑 Get API Credentials

### M-Pesa (Safaricom)
1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create account & app
3. Get Consumer Key & Secret
4. Note your Shortcode & Passkey

### PayPal
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create app
3. Get Client ID & Secret

### MongoDB
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string

## 📱 Test Payments

### M-Pesa Test
- Use Safaricom sandbox
- Test phone: 254712345678
- Test amount: KES 1

### PayPal Test
- Use PayPal sandbox
- Create test accounts
- Test with sandbox credentials

## 🎯 Features to Test

1. ✅ Homepage product cards
2. ✅ Free checklist download
3. ✅ Course purchase (M-Pesa/PayPal)
4. ✅ Indicators subscription
5. ✅ Admin dashboard
6. ✅ User authentication

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB connection
- Verify .env file exists
- Run `npm install` again

**M-Pesa not working:**
- Verify credentials in .env
- Check phone number format (254...)
- Ensure callback URL is accessible

**PayPal not working:**
- Check Client ID in .env
- Verify sandbox/production mode
- Check browser console for errors

## 📞 Support

Issues? Contact:
- Email: support@bullbear.com
- Twitter: [@starico](https://twitter.com/starico)
- GitHub Issues: [Create Issue](https://github.com/sethdev254/bullbear-trading/issues)

---

**Ready to deploy?** See [README.md](README.md) for deployment guides.
