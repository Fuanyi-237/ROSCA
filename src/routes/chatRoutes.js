const express = require('express');
const { getMessages } = require('../services/chatService');

const router = express.Router();

router.get('/:roomId/messages', async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await getMessages(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

module.exports = router;
