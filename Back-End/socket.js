const Message = require("./model/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.on("join", (user) => {
  if (user && user.fullName) {
    console.log(`${user.fullName} joined`);
  } else {
    console.log("A user joined, but fullName was missing or null");
  }
});

    socket.on("sendMessage", async (msgData) => {
      const saved = await new Message(msgData).save();
      io.emit("receiveMessage", saved);
    });

    socket.on("pinMessage", async (msgId) => {
      await Message.findByIdAndUpdate(msgId, { pinned: true });
      io.emit("pinned", msgId);
    });

    socket.on("typing", (fullName) => {
      socket.broadcast.emit("userTyping", fullName);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socketHandler;
