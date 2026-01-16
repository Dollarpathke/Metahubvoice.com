# M-Pesa Quick Start Guide 🚀

## What You Need

1. **Safaricom Developer Account**
   - Sign up at: https://developer.safaricom.co.ke/
   - Create an app in Daraja portal
   - Get your Consumer Key and Consumer Secret

2. **Sandbox Credentials** (for testing)
   ```
   Consumer Key: [Get from Daraja portal]
   Consumer Secret: [Get from Daraja portal]
   Shortcode: 174379
   Passkey: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
   ```

---

## Quick Setup (3 Steps)

### Step 1: Add Credentials to .env

Open `backend/.env` and update:

```env
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
MPESA_ENV=sandbox
```

### Step 2: Start Backend

```bash
cd backend
npm start
```

### Step 3: Test Payment

1. Open `trading-indicators.html`
2. Click "Subscribe Now"
3. Select "M-Pesa (Kenya)"
4. Enter phone: `254708374149` (sandbox test number)
5. Click "Send Payment Prompt"

**Or use the quick test script:**
```bash
test-mpesa.bat
```

---

## Testing Without Real Credentials

If you don't have Safaricom credentials yet, the frontend will show an error. To test the UI:

1. The subscription modal works without backend
2. The M-Pesa form and UI are fully functional
3. You'll see an error when clicking "Send Payment Prompt"

---

## For Production

1. Complete Safaricom Go-Live process
2. Get production credentials
3. Update `.env`:
   ```env
   MPESA_ENV=production
   MPESA_CALLBACK_URL=https://your-production-domain.com/api/mpesa/callback
   ```
4. Deploy backend to public server (Vercel/Heroku/Railway)

---

## Payment Details

- **Amount**: KES 3,900 ($30 USD)
- **Payment To**: 0799997293
- **Subscription**: 30 days
- **Method**: STK Push (user enters PIN on phone)

---

## Troubleshooting

**"Failed to send payment prompt"**
- Check if backend is running on port 5000
- Verify credentials in `.env`
- Check backend console for error logs

**"Callback not received"**
- Callback URL must be publicly accessible
- Use ngrok for local testing: `ngrok http 5000`
- Update `MPESA_CALLBACK_URL` with ngrok URL

**"Invalid phone number"**
- Format: 0712345678 (10 digits starting with 0)
- Or: 254712345678 (with country code)
- Sandbox test number: 254708374149

---

## Files You Need to Know

- `backend/routes/mpesa.js` - M-Pesa API logic
- `backend/.env` - Configuration (add credentials here)
- `trading-indicators.html` - Frontend with M-Pesa payment
- `MPESA_INTEGRATION_COMPLETE.md` - Full documentation

---

## Quick Commands

```bash
# Start backend
cd backend
npm start

# Test M-Pesa integration
test-mpesa.bat

# View backend logs
# (Check console where npm start is running)
```

---

## Support Links

- Safaricom Developer Portal: https://developer.safaricom.co.ke/
- Daraja API Docs: https://developer.safaricom.co.ke/Documentation
- Get Credentials: https://developer.safaricom.co.ke/MyApps

---

**Ready to test?** Run `test-mpesa.bat` or follow Step 2 above!
