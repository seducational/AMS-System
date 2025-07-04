const express = require('express');
const router = express.Router();
const Notification = require('../model/Notification');

// POST notification (Admin)
router.post('/postNotification', async (req, res) => {
  try {
    const { title, message } = req.body;
    const newNotification = new Notification({ title, message });
    await newNotification.save();
    res.status(201).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// GET notifications (Main Website)
router.get('/getNotification', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
