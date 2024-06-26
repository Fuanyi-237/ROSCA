const mongoose = require('mongoose');
const contributionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  amount: Number,
  timestamp: Date,
});

const Contribution = mongoose.model('Contribution', contributionSchema);

// Mock implementation for Contribution.find()
Contribution.find = jest.fn().mockImplementation(() => ({
  sort: jest.fn().mockResolvedValueOnce([])
}));

module.exports = Contribution;
