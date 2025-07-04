const AccountRequest = require('../model/accountRequestModel');
const User = require('../model/authModel'); // Apna existing user model ka path dena
const bcrypt = require('bcryptjs');

exports.approveRequest = async (req, res) => {
    console.log("Full request body in approveRequest:", req.body);

    try {
        console.log("Full request body in approveRequest2:", req.body);
      const { requestId } = req.params;
      const { password } = req.body;
      console.log("Password coming in approveRequest:", password);

      // 1. Validate password input
      if (!password) {
        return res.status(400).send('Password is required');
      }
  
      // 2. Find the request
      const request = await AccountRequest.findById(requestId);
      if (!request) {
        return res.status(404).send('Request not found');
      }
  
      // 3. Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 4. Create a new User from the approved request
      const newUser = new User({
        firstName: request.firstName,
        middleName: request.middleName, 
        lastName: request.lastName,
        email: request.email,
        password: hashedPassword,
        userType: request.userType,
      });
  
      await newUser.save();
  
      // 5. Update request status
      request.status = 'approved';
      request.isApproved = true;
      await request.save();
  
      res.status(200).send('User approved and added successfully');
  
    } catch (error) {
      console.error("Approve Request Error:", error); // Better error logs
      res.status(500).send('Server error');
    }
  };
  


exports.rejectRequest = async (req, res) => {
    try {
        const { id } = req.body; // Yahan bhi 'id' hona chahiye

        const request = await AccountRequest.findById(id); // Ab 'id' use karo
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'rejected';
        await request.save();

        res.json({ message: 'Request rejected' });
    } catch (error) {
        console.error("Reject Request Error:", error); // Detailed error logging
        res.status(500).json({ message: 'Server error' });
    }
};


        exports.sendAccountRequest = async (req, res) => {
          try {
            const { firstName, middleName, lastName, email, userType } = req.body;
        
            const existingRequest = await AccountRequest.findOne({ email });
            if (existingRequest) {
              return res.status(400).json({ message: 'Request already sent' });
            }
        
            const newRequest = new AccountRequest({ firstName, middleName, lastName, email, userType });
            await newRequest.save();
        
            res.status(201).json({ message: 'Account request sent successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          }
        };
        
        exports.getAllAccountRequests = async (req, res) => {
          try {
            const requests = await AccountRequest.find().sort({ createdAt: -1 });
            res.json({ requests });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          }
        };