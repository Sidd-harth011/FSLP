const mongoose = require('mongoose');
const userSchema = new mongoose.userSchema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        unique: true,
        uppercase: true,
    },
    email:{
        type: String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 1024,
        select: false, // Exclude password from queries by default
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15,
        unique: true,
    },
    address:{
        type:String,
        required:false,
        trim: true,
        maxlength: 255,
        default: 'Not provided',
        unique:false,
    },
    profession:{
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
        default: 'Not specified',
        unique: false,
    },
    age:{
        type: Number,
        required: false,
        min: 0,
        max: 200,
        default: null, // Allow null for age if not specified
    },
    gender:{
        type: String,
        required: false,
        enum:["male","female","other"],
        default: "Not Specified",
    },
    location:{
        type:[Number],
    },
    review:{
        type:String,
        required: false,
        trim: true,
        maxlength: 500,
        default: 'No review provided',
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;