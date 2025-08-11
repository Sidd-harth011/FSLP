// server/models/Users.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: false },
  lon: { type: Number, required: false },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false, trim: true },
  email: { type: String, required: true, unique: false, trim: true, lowercase: true },
  password: { type: String, unique: false, required: false }, // you may mark required true if you need
  phone: { type: String, unique: false, required: false },
  address: { type: String, unique: false, required: false },
  profession: { type: String, unique: false, required: false },
  age: { type: Number, unique: false, required: false },
  gender: { type: String, unique: false, required: false },
  location: { type: locationSchema, unique: false, required: false },
  about: { type: String, unique: false, required: false, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
