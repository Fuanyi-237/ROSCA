const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    president: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    contributionAmount: { type: Number, required: true, default: 0 },
    frequency: { type: String, enum: ['weekly', 'monthly'], required: true },
    nextContributionDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
