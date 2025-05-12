const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  senderName: String,
  role: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  room: String,
  pinned: { type: Boolean, default: false },
  reactions: { type: Object, default: {} },
});

module.exports = mongoose.model("Message", messageSchema);
