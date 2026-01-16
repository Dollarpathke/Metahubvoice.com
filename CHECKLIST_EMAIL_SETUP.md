# Checklist Email Setup Guide

## Overview
The checklist download feature now requires users to sign up with their phone number and automatically sends the PDF to their email.

## Features Implemented

### 1. **Required Phone Number**
- Phone number is now mandatory during signup
- Validation ensures phone number is provided

### 2. **Automatic Email Delivery**
- PDF is sent to user's email immediately after signup
- Beautiful HTML email template with BullBear branding
- PDF attached to the email

### 3. **Download Protection**
- Users must sign up before downloading
- Checklist only available after providing:
  - Full name
  - Email address
  - Phone number (required)
  - Password

## Setup Instructions

### Step 1: Configure Email Service

1. **Open `backend/.env` file**

2. **Add your email credentials:**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

### Step 2: Get Gmail App Password (Recommended)

If using Gmail:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification (if not already enabled)
4. Go to "App passwords"
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Use this password in `EMAIL_PASSWORD` (not your regular Gmail password)

### Step 3: Alternative Email Services

You can use other email services by updating the transporter configuration in `backend/routes/checklist.js`:

**For Outlook/Hotmail:**
```javascript
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

**For Custom SMTP:**
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.yourdomain.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

### Step 4: Start the Backend

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

## How It Works

### User Flow:

1. **User clicks checklist card** on homepage
2. **Redirected to signup page** (`checklist-signup.html`)
3. **User fills form** with:
   - Name
   - Email
   - Phone (required)
   - Password
4. **After signup:**
   - PDF downloads to browser
   - Email sent with PDF attachment
   - User redirected to homepage

### Technical Flow:

```
Frontend (checklist-signup.html)
    ↓
User submits form
    ↓
downloadChecklist() function
    ↓
sendChecklistEmail() API call
    ↓
Backend (/api/checklist/send-email)
    ↓
Nodemailer sends email with PDF
    ↓
User receives email
```

## Files Modified

### Frontend:
- `checklist-signup.html` - Made phone required, added email sending
- `index.html` - Updated PDF filename and added email sending

### Backend:
- `backend/routes/checklist.js` - New route for sending emails
- `backend/server.js` - Added checklist route

## Email Template Features

The email includes:
- ✅ Professional BullBear branding
- ✅ Blue gradient design matching website
- ✅ User's contact information
- ✅ PDF attachment
- ✅ Call-to-action button
- ✅ Responsive design

## Testing

### Test the Email Feature:

1. Start the backend server
2. Open `checklist-signup.html` in browser
3. Fill out the signup form
4. Check your email inbox
5. Verify PDF is attached

### Troubleshooting:

**Email not sending?**
- Check `backend/.env` has correct email credentials
- Verify Gmail app password is correct
- Check backend console for error messages
- Ensure backend server is running

**PDF not found?**
- Verify `crypto-quickstart-checklist.pdf` exists in root directory
- Check file path in `backend/routes/checklist.js`

## Security Notes

- ✅ Email credentials stored in `.env` (not committed to git)
- ✅ Rate limiting applied to prevent spam
- ✅ User data validated before processing
- ✅ Phone number required for better lead quality

## Future Enhancements

Consider adding:
- Email verification before download
- Download tracking in database
- Email marketing integration (Mailchimp, SendGrid)
- SMS notification option
- Multiple language support

## Support

If you need help:
1. Check backend console logs
2. Verify all environment variables are set
3. Test email credentials separately
4. Check spam folder for test emails

---

**Status:** ✅ Ready to use
**Last Updated:** January 2025
