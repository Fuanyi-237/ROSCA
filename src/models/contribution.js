const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  amount: Number,
  timestamp: Date,
});

module.exports = mongoose.model('Contribution', contributionSchema);
