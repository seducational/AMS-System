// controllers/userController.js

const getAllUsers = require('../model/authModel');

exports.getAllUsers = async (req, res) => {
 try {
    const users = await getAllUsers.find({}, { password: 0, otp: 0, otpExpiry: 0, email: 0 }); // exclude sensitive fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};
