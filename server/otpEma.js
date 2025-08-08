const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not regular Gmail password
  },
});

const mailOptions = {
  from: 'siddharthgautam573@gmail.com',
  to: 'kerisgautam@gmail.com',
  subject: '505050',
  text: 'Your OTP is 123456',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
