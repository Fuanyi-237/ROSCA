const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  totalContributions: { type: Number, default: 0 },
});

const Group = mongoose.model('Group', groupSchema);

// Mock implementation for Group.findById()
Group.findById = jest.fn();

module.exports = Group;
