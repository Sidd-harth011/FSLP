const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true,
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        select: false, // Exclude password from queries by default
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address:{
        type:String,
        required:false,
        trim: true,
        default: 'Not provided',
        unique:false,
    },
    profession:{
        type: String,
        required: false,
        trim: true,
        default: 'Not specified',
        unique: false,
    },
    age:{
        type: Number,
        required: false,
        max: 200,
        default: null, // Allow null for age if not specified
    },
    gender:{
        type: String,
        required: false,
        enum:["male","female","others"],
        default: "Not Specified",
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        }
    },
    about:{
        type: Object,
        required: false,
        trim: true,
        default: 'No review provided',
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;