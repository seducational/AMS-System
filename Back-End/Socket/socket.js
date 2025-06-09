// socket/socketHandler.js

let users = {}; // socket.id => username

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', (username) => {
      users[socket.id] = username;
      socket.broadcast.emit('userConnected', username);
      io.emit('userList', Object.values(users));
      console.log(`${username} joined the chat`);
    });

    socket.on('message', (message) => {
      const username = users[socket.id] || 'Unknown';
      io.emit('message', { user: username, text: message });
      console.log(`Message from ${username}: ${message}`);
    });

    socket.on('disconnect', () => {
      const username = users[socket.id];
      delete users[socket.id];
      socket.broadcast.emit('userDisconnected', username);
      io.emit('userList', Object.values(users));
      console.log(`${username} disconnected`);
    });
  });
}

module.exports = socketHandler;
