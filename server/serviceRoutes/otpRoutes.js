// serviceRoutes/otpRoutes.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('./emaSend');
const { sendSms } = require('./otpSend');
const axios = require("axios");

router.post('/send-otp', async (req, res) => {
  const { email, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // 1. Send Email
    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    // 2. Send SMS
    await sendSms(phone, `Your OTP code is ${otp}`);

    // 3. Send OTP to external API
    const apiResponse = await axios.post('http://localhost:5000/api/store-otp', {
      otp,           // the OTP we generated
      expiresIn:300,
    });

    console.log("API Response:", apiResponse.data);

    // 4. Success response to frontend
    return res.json({
      success: true,
      message: 'OTP sent successfully!',
      redirect: '/verification',
      otpApiStatus: apiResponse.data // forward API's response to frontend if needed
    });

  } catch (err) {
  console.error('OTP send error:', err);

  // 1️⃣ Wrong phone number (Twilio SMS error)
  if (
    err?.code === 21408 ||                              // Twilio region restriction
    (typeof err?.code === 'number' && err?.status === 400) || 
    (err?.message && err.message.includes('Permission to send an SMS'))
  ) {
    return res.status(500).json({
      success: false,
      errorType: 'phone',
      redirect: '/wrongphone',
      message: 'Invalid or unsupported phone number for SMS.'
    });
  }

  // 2️⃣ Wrong email address (Nodemailer error)
  if (
    err?.code === 'EENVELOPE' ||                        // No recipient or invalid address
    (err?.message && err.message.includes('No recipients defined'))
  ) {
    return res.status(500).json({
      success: false,
      errorType: 'email',
      redirect: '/wrongemail',
      message: 'Invalid recipient email address.'
    });
  }

  // 3️⃣ Fallback: Unknown error
  return res.status(500).json({
    success: false,
    errorType: 'unknown',
    redirect: '/error',
    message: 'Unexpected error while sending OTP.'
  });
  }
});

module.exports = router;