const Message = require('../model/Message');

// Send Message (Save to DB)
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, isGroup } = req.body;

    // Validate input
    if (!senderId || !content) {
      return res.status(400).json({ message: "Sender ID and content are required." });
    }
    console.log("Sender ID:", senderId);
    // Create message object
    const message = new Message({
      sender: senderId,
      content,
      isGroup: isGroup || false,
      receiver: isGroup ? null : receiverId || null,  // only include receiverId if it's private
    });

    await message.save();

    res.status(201).json({
      message: 'Message sent',
      data: message
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get Messages between Two Users OR Public
exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId, isGroup } = req.query;

    let filter = {};

    if (isGroup === 'true') {
      filter = { isGroup: true };
    } else {
      filter = {
        isGroup: false,
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      };
    }

    const messages = await Message.find(filter)
      .sort({ timestamp: 1 })
      .populate('sender', 'firstName userType')
      .populate('receiver', 'firstName userType');

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
