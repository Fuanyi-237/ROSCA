const mongoose = require('mongoose');
const Contribution = require('../models/contribution');
const Group = require('../models/group');

const addContribution = async (userId, groupId, amount) => {
  const contribution = new Contribution({ user: userId, group: groupId, amount, timestamp: new Date() });
  await contribution.save();

  const group = await Group.findById(groupId);
  group.totalContributions += amount;

  const members = group.members.length;
  const contributions = await Contribution.find({ group: groupId }).sort({ timestamp: 1 });

  if (contributions.length % members === 0) {
    const index = Math.floor(contributions.length / members) % members;
    const payoutMember = group.members[index];
    await payoutUser(payoutMember, group.totalContributions);
    group.totalContributions = 0;
  }

  await group.save();
};

const payoutUser = async (userId, amount) => {
  // Logic to pay the user
  console.log(`Payout ${amount} to user ${userId}`);
};

module.exports = {
  addContribution,
};
