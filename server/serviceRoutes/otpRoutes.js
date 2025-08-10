// serviceRoutes/otpRoutes.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('./emaSend');
const { sendSms } = require('./otpSend');

router.post('/send-otp', async (req, res) => {
  const { email, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Send Email
    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    // Send SMS
    await sendSms(phone, `Your OTP code is ${otp}`);

    // success
    return res.json({ success: true, message: 'OTP sent successfully!', redirect: '/verification' });
  } catch (err) {
    console.error('OTP send error:', err);

    // Robust-ish classification:
    // Twilio errors usually include numeric `code` property
    if (err && typeof err.code === 'number') {
      // Twilio error
      return res.status(500).json({ success: false, redirect: '/wrongphone' });
    }

    // Nodemailer or SMTP errors often don't have numeric code like Twilio; check message
    if (err && err.message && /auth|invalid|login|ENOTFOUND|EENVELOPE/i.test(err.message)) {
      return res.status(500).json({ success: false, redirect: '/wrongemail' });
    }

    // fallback
    return res.status(500).json({ success: false, redirect: '/error' });
  }
});

module.exports = router;
