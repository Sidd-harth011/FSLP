require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: `Your OTP code is ${Math.random().toString(36).substring(2, 6)}`,
    from: process.env.TWILIO_FROM_PHONE_NUMBER, // your Twilio phone number
    to: '7877575555' // recipient
  })
  .then(message => console.log("SMS sent, SID:", message.sid))
  .catch(err => console.error("Failed to send SMS:", err));
