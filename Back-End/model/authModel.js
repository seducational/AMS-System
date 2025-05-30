const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['admin', 'user', 'doctor'], required: true },
    otp: { type: String },  // 🔥 Naya field for OTP
    otpExpiry: { type: Date } // 🔥 OTP expiry time
});

module.exports = mongoose.model('User', userSchema);
