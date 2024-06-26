const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config');
const chatRoutes = require('./routes/chatRoutes');
const { redisClient } = require('./config/redisClient');
const http = require('http');
const socketIo = require('socket.io');
const { swaggerUi, specs } = require('./swaggerConfig');

const app = express();
const port = config.PORT || 5000; // Use config.PORT if available, else default to 5000

const server = http.createServer(app);
const io = socketIo(server);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(express.json());
app.use('/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { roomId, message } = data;
    // Save message to Redis
    await redisClient.lpush(`room:${roomId}`, JSON.stringify(message));
    io.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`MongoDB connected successfully`);
    });
  })
  .catch(err => console.error(err));
