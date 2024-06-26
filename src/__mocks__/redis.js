const redis = jest.createMockFromModule('redis');

let data = {};

redis.createClient = () => ({
  lpush: jest.fn((key, value) => {
    if (!data[key]) data[key] = [];
    data[key].unshift(value);
  }),
  lrange: jest.fn((key, start, end) => {
    return data[key] ? data[key].slice(start, end + 1) : [];
  }),
  on: jest.fn(),
});

module.exports = redis;
