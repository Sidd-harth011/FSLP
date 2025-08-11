// server/serviceRoutes/otpRoutes.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('./emaSend');
const { sendSms } = require('./otpSend');
const axios = require('axios');

// In-memory OTP store for demo/testing.
// Structure: { "<email-or-phone-key>": { otp: "123456", expiresAt: 1234567890 } }
// NOTE: For production replace with DB or Redis.
const otpStore = new Map();

function storeOtpForKey(key, otp, ttlSeconds = 300) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otpStore.set(key, { otp, expiresAt });
}

function getStoredOtpForKey(key) {
  const record = otpStore.get(key);
  if (!record) return null;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return null;
  }
  return record.otp;
}

// POST /api/send-otp
// body: { email, phone }
router.post('/send-otp', async (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone) {
    return res.status(400).json({ success: false, message: 'Missing email or phone' });
  }

  // Generate OTP once
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Send email (don't await too long if you want parallel — but await to catch errors)
    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    // Send SMS
    await sendSms(phone, `Your OTP code is ${otp}`);

    // Store per-user OTP keyed by email (you can also key by phone)
    storeOtpForKey(email, otp, 300); // 5 minutes TTL
    // Optionally store by phone as well:
    storeOtpForKey(phone, otp, 300);

    // Optionally forward OTP to other internal API: (uncomment to use)
    // await axios.post('http://localhost:5000/api/store-otp', { otp, email, phone, expiresIn: 300 });

    // Return success. For local testing we'll include the OTP only when not in production.
    const resp = {
      success: true,
      message: 'OTP sent successfully!',
      redirect: '/verification'
    };
    if (process.env.NODE_ENV !== 'production') {
      resp.otp = otp; // for local dev/testing only
    }

    return res.json(resp);
  } catch (err) {
    console.error('OTP send error:', err);

    // Generic failure (do not reveal internal details to client)
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again later.',
      redirect: '/error'
    });
  }
});

// GET /api/get-otp?key=<email-or-phone>
// For testing: returns stored OTP for given key (email or phone). Only for dev.
router.get('/get-otp', (req, res) => {
  const key = req.query.key; // e.g. ?key=user@example.com or ?key=+911234567890
  if (!key) {
    return res.status(400).json({ success: false, message: 'Missing key query param' });
  }
  const otp = getStoredOtpForKey(key);
  if (!otp) {
    return res.status(404).json({ success: false, message: 'OTP not found or expired' });
  }
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Not allowed in production' });
  }
  return res.json({ success: true, otp });
});

module.exports = router;
