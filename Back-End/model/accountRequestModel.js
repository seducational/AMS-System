// model/accountRequestModel.js
const mongoose = require('mongoose');

const accountRequestSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type:String},
    userType: { type: String, enum: ['doctor', 'user'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isApproved: { type: Boolean, default: false },
}, 
{ timestamps: true });

module.exports = mongoose.model('AccountRequest', accountRequestSchema);
