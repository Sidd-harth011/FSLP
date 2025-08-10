// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const otpRoute = require('./serviceRoutes/otpRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', otpRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
