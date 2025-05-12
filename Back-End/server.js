const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();


const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./route/authRoutes');
app.use('/auth', authRoutes);

const messageRoutes = require('./route/messageRoutes');
app.use('/api', messageRoutes);

// Socket
// Create HTTP server

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Real-time chat logic
let users = {}; // socket.id => username

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
// const socketHandler = require('./socket');
// socketHandler(io);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
