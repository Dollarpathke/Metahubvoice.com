# M-Pesa Integration Checklist ✅

## Pre-Testing Setup

### 1. Get Safaricom Credentials
- [ ] Go to https://developer.safaricom.co.ke/
- [ ] Create account or log in
- [ ] Create a new app in Daraja portal
- [ ] Copy Consumer Key
- [ ] Copy Consumer Secret
- [ ] Note Passkey (sandbox: `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`)

### 2. Configure Backend
- [ ] Open `backend/.env`
- [ ] Paste Consumer Key: `MPESA_CONSUMER_KEY=...`
- [ ] Paste Consumer Secret: `MPESA_CONSUMER_SECRET=...`
- [ ] Verify Shortcode: `MPESA_SHORTCODE=174379`
- [ ] Verify Passkey: `MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`
- [ ] Set environment: `MPESA_ENV=sandbox`

### 3. Setup Callback URL (for testing)
- [ ] Install ngrok: https://ngrok.com/download
- [ ] Run: `ngrok http 5000`
- [ ] Copy ngrok URL (e.g., `https://abc123.ngrok.io`)
- [ ] Update in `.env`: `MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback`

---

## Testing Checklist

### Backend Testing
- [ ] Open terminal in `backend` folder
- [ ] Run: `npm start`
- [ ] Verify: "Bull Bear Trading API running on port 5000"
- [ ] Verify: No error messages
- [ ] Check: http://localhost:5000/api/health (should return JSON)

### Frontend Testing
- [ ] Open `trading-indicators.html` in browser
- [ ] Verify: Page loads without errors
- [ ] Verify: Subscription lock overlay appears
- [ ] Click: "Subscribe Now - $30/month" button
- [ ] Verify: Payment modal opens

### M-Pesa Form Testing
- [ ] Select: "M-Pesa (Kenya)" from dropdown
- [ ] Verify: M-Pesa payment form appears
- [ ] Verify: Shows "KES 3,900" amount
- [ ] Verify: Shows "Payment to: 0799997293"
- [ ] Enter email: `test@example.com`
- [ ] Enter phone: `254708374149` (sandbox test number)
- [ ] Click: "Send Payment Prompt" button

### Backend Response Testing
- [ ] Verify: Button shows "⏳ Sending prompt..."
- [ ] Check backend console for logs
- [ ] Verify: Access token generated
- [ ] Verify: STK Push request sent
- [ ] Verify: Response received from Safaricom
- [ ] Verify: Frontend shows "✅ Prompt Sent!"
- [ ] Verify: Modal shows "Check Your Phone!"
- [ ] Verify: Transaction ID displayed

### Payment Testing (Sandbox)
- [ ] Check test phone for M-Pesa prompt
- [ ] Enter PIN: `1234` (or as provided by Safaricom)
- [ ] Confirm payment
- [ ] Wait for callback (check backend console)
- [ ] Verify: Callback received with ResultCode
- [ ] Verify: Payment details logged

---

## Production Checklist

### Before Going Live
- [ ] Complete Safaricom Go-Live process
- [ ] Get production Consumer Key
- [ ] Get production Consumer Secret
- [ ] Get production Passkey
- [ ] Get production Shortcode
- [ ] Update `.env` with production credentials
- [ ] Change: `MPESA_ENV=production`

### Deployment
- [ ] Deploy backend to public server (Vercel/Heroku/Railway)
- [ ] Get production URL (e.g., `https://api.bullbeartrading.com`)
- [ ] Update: `MPESA_CALLBACK_URL=https://api.bullbeartrading.com/api/mpesa/callback`
- [ ] Verify: Callback URL is HTTPS
- [ ] Verify: Callback URL is publicly accessible
- [ ] Test: Send request to callback URL (should return 200)

### Database Integration
- [ ] Open `backend/routes/mpesa.js`
- [ ] Find callback handler (line ~120)
- [ ] Implement: Save payment to database
- [ ] Implement: Create subscription record
- [ ] Implement: Set expiry date (+30 days)
- [ ] Implement: Link to user account
- [ ] Test: Verify database updates on payment

### Email Notifications
- [ ] Configure email service in `.env`
- [ ] Create email template for payment confirmation
- [ ] Implement: Send email on successful payment
- [ ] Include: Receipt number, amount, expiry date
- [ ] Test: Verify email received

### Frontend Updates
- [ ] Update API URL in `trading-indicators.html`
- [ ] Change: `http://localhost:5000` to production URL
- [ ] Test: Payment flow on production
- [ ] Verify: Subscription unlocks content

### Security
- [ ] Verify: `.env` not committed to Git
- [ ] Verify: Credentials are secure
- [ ] Verify: Callback validates requests
- [ ] Verify: Phone numbers are validated
- [ ] Verify: Amounts are validated
- [ ] Add: Rate limiting on payment endpoint
- [ ] Add: Logging for all transactions

### Testing Production
- [ ] Test with real phone number
- [ ] Test with real payment
- [ ] Verify: STK Push received
- [ ] Verify: Payment processed
- [ ] Verify: Callback received
- [ ] Verify: Database updated
- [ ] Verify: Email sent
- [ ] Verify: Subscription activated
- [ ] Verify: Content unlocked

---

## Monitoring Checklist

### Daily Monitoring
- [ ] Check backend logs for errors
- [ ] Monitor callback success rate
- [ ] Check failed payments
- [ ] Review transaction logs
- [ ] Monitor API response times

### Weekly Review
- [ ] Review total transactions
- [ ] Check subscription renewals
- [ ] Analyze failed payments
- [ ] Review user feedback
- [ ] Update documentation if needed

---

## Troubleshooting Checklist

### If STK Push Fails
- [ ] Check: Backend is running
- [ ] Check: Credentials in `.env` are correct
- [ ] Check: Phone number format (254XXXXXXXXX)
- [ ] Check: Amount is valid number
- [ ] Check: Backend console for error logs
- [ ] Check: Safaricom API status

### If Callback Not Received
- [ ] Check: Callback URL is publicly accessible
- [ ] Check: Callback URL is HTTPS
- [ ] Check: ngrok is running (for testing)
- [ ] Check: Backend console for callback logs
- [ ] Check: Safaricom sent callback (check their logs)
- [ ] Test: Send manual POST to callback URL

### If Payment Successful But Not Activated
- [ ] Check: Callback handler logs
- [ ] Check: ResultCode === 0 in callback
- [ ] Check: Database update logic
- [ ] Check: Subscription record created
- [ ] Check: Expiry date set correctly
- [ ] Check: Frontend checks subscription status

---

## Quick Commands

```bash
# Start backend
cd backend
npm start

# Test M-Pesa
test-mpesa.bat

# Start ngrok (for callback testing)
ngrok http 5000

# Check backend health
curl http://localhost:5000/api/health

# Test STK Push (manual)
curl -X POST http://localhost:5000/api/mpesa/stkpush \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"254708374149","amount":3900}'
```

---

## Support Resources

- **Safaricom Portal**: https://developer.safaricom.co.ke/
- **API Documentation**: https://developer.safaricom.co.ke/Documentation
- **Support Email**: apisupport@safaricom.co.ke
- **Test Credentials**: https://developer.safaricom.co.ke/test_credentials

---

## Documentation Files

- [ ] Read: `MPESA_INTEGRATION_COMPLETE.md` (full technical docs)
- [ ] Read: `MPESA_QUICK_START.md` (quick setup guide)
- [ ] Read: `MPESA_FLOW_DIAGRAM.md` (visual flow)
- [ ] Read: `MPESA_SETUP_SUMMARY.md` (summary)
- [ ] Read: `MPESA_CHECKLIST.md` (this file)

---

## Current Status

**Integration**: ✅ Complete
**Backend**: ✅ Ready
**Frontend**: ✅ Ready
**Testing**: ⚠️ Needs Safaricom credentials
**Production**: ⚠️ Needs deployment

---

## Next Action

**→ Get Safaricom credentials from https://developer.safaricom.co.ke/**

Then follow the "Testing Checklist" above.

---

**Developer**: @starico
**Date**: January 15, 2026
**Platform**: BullBear Trading
