const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/authModel');

// Register Controller
exports.register = async (req, res) => {
    const { firstName,middleName,lastName, email, password, userType } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            userType
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
      console.log("In try block");
        let user = await User.findOne({ email, userType });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('User input password:', password);
        console.log('Hashed password from DB:', user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '9h' }
        );

        res.json({ token, userType: user.userType });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//forgot passsword send otp code
// const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // if (!user.isApproved) {
    //   return res.status(403).json({ message: "Your account is not approved yet" });
    // }
    

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry (5 min valid)
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; 
    await user.save();

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ya jo service use karna hai
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//verify and reset password
exports.resetPasswordWithOtp = async (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  
      if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update password & clear OTP
      user.password = hashedPassword;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

  // Get User Profile
  exports.getLoggedInUserName = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('firstName middleName lastName');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({    
           firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName, });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//get doctor and cot team count
exports.getUserCounts = async (req, res) => {
  try {
    // Role wise count nikal rahe hain
    const doctorsCount = await User.countDocuments({ userType: 'doctor' });
    const cotTeamCount = await User.countDocuments({ userType: 'user' }); // assuming 'user' is COT team

    res.status(200).json({
      doctorsCount,
      cotTeamCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counts', error });
  }
};
  
//get method for Doctors data
// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ userType: 'doctor' }).select('firstName middleName lastName email');
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//get api for cot team
exports.getAllCotTeam = async (req,res) =>{
  try{
    const cot = await User.find({userType:'user'}).select('firstName middleName lastName email');
    res.status(200).json(cot);
  }catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

// Delete API for doctor
exports.deleteMember = async (req, res) => {
  try {
    const deletedData = await User.deleteOne({ _id: req.params._id });
    
    if (deletedData.deletedCount === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
