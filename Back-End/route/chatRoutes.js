const express = require('express');
const router = express.Router();
const messageController = require('../controller/chatController');

// POST: Send message
router.post('/send-message', messageController.sendMessage);

// GET: Fetch messages (public or private)
router.get('/get-messages', messageController.getMessages);

module.exports = router;