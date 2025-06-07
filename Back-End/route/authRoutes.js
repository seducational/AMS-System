const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../auth_Middleware');

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

//forgot password
router.post('/send-otp', authController.sendOtp);
router.post('/reset-password', authController.resetPasswordWithOtp);

router.get('/me', authMiddleware, authController.getLoggedInUserName);

router.get('/dashboard-counts', authController.getUserCounts);
router.get('/doctors', authController.getAllDoctors);
router.get('/cotTeam', authController.getAllCotTeam);

router.delete('/deleteMember/:_id',authController.deleteMember)

module.exports = router;
