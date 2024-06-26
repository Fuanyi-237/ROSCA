const { redisClient } = require('../config/redisClient');
const Message = require('../models/message');

async function saveMessage(roomId, message) {
  await redisClient.lpush(`room:${roomId}`, JSON.stringify(message));
  // Optionally save to MongoDB for persistent storage
  const newMessage = new Message(message);
  await newMessage.save();
}

async function getMessages(roomId) {
  const messages = await redisClient.lrange(`room:${roomId}`, 0, -1);
  return messages.map((msg) => JSON.parse(msg));
}

module.exports = {
  saveMessage,
  getMessages,
};
