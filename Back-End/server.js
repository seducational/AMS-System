const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');

dotenv.config();


const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: 'https://ams-system-sy.vercel.app',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Authentication Routes
const authRoutes = require('./route/authRoutes');
app.use('/auth', authRoutes);

//ChatBox Routes
const userRoutes = require('./route/userRoutes');
app.use('/api', userRoutes);

const chatRoutes = require('./route/chatRoutes');
app.use('/api', chatRoutes);

//Patient Data Routes
const notificationRoutes = require('./route/notifiacationRoute');
app.use('/notify',notificationRoutes)

const accountRequestRoutes = require('./route/accountRequestRoutes');
app.use('/request', accountRequestRoutes);

const patientDataRoutes = require('./route/PatientDataRoute');
app.use('/patient', patientDataRoutes);
// Socket
// Create HTTP server

// Socket.IO setup
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://ams-system-sy.vercel.app/"],
    methods: ['GET', 'POST']
  }
});
require('./Socket/socket')(io);



// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
