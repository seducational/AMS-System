const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

//forgot password
router.post('/send-otp', authController.sendOtp);
router.post('/reset-password', authController.resetPasswordWithOtp);

module.exports = router;
