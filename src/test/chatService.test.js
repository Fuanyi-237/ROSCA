const { saveMessage, getMessages } = require('../services/chatService');
const redis = require('redis');

jest.mock('redis');

describe('Chat Service', () => {
  beforeEach(() => {
    redis.createClient().lpush.mockClear();
    redis.createClient().lrange.mockClear();
  });

  it('should save a message to Redis', async () => {
    const message = { roomId: 'room1', senderId: 'user1', text: 'Hello', timestamp: Date.now() };
    await saveMessage('room1', message);
    expect(redis.createClient().lpush).toHaveBeenCalledWith('room:room1', JSON.stringify(message));
  });

  it('should get messages from Redis', async () => {
    const message = { roomId: 'room1', senderId: 'user1', text: 'Hello', timestamp: Date.now() };
    await saveMessage('room1', message);
    const messages = await getMessages('room1');
    expect(messages).toEqual([message]);
  });
});
    