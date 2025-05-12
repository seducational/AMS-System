const express = require("express");
const router = express.Router();
const { getAllMessages, pinMessage } = require("../controller/messageController");

router.get("/messages", getAllMessages);
router.put("/messages/pin/:id", pinMessage);

module.exports = router;
