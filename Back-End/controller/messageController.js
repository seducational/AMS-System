const Message = require("../model/Message");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.pinMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { pinned: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to pin message" });
  }
};
