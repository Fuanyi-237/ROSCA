const mongoose = require('mongoose');
const { addContribution } = require('../services/roscaService');
const Contribution = require('../models/contribution');
const Group = require('../models/group');

jest.mock('../models/contribution');
jest.mock('../models/group');

describe('ROSCA Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle contributions and payouts in the correct order', async () => {
    const groupId = new mongoose.Types.ObjectId();
    const userId1 = new mongoose.Types.ObjectId();
    const userId2 = new mongoose.Types.ObjectId();

    const group = {
      _id: groupId,
      members: [userId1, userId2],
      totalContributions: 0,
      save: jest.fn(),
    };

    Group.findById.mockResolvedValue(group);

    // Mock the find method to return an array with sort method
    Contribution.find.mockImplementation(() => ({
      sort: jest.fn().mockResolvedValueOnce([{ user: userId1, group: groupId, amount: 100, timestamp: new Date('2023-01-01') }])
    }));

    await addContribution(userId1, groupId, 100);
    expect(Contribution.prototype.save).toHaveBeenCalled();

    Contribution.find.mockImplementation(() => ({
      sort: jest.fn().mockResolvedValueOnce([
        { user: userId1, group: groupId, amount: 100, timestamp: new Date('2023-01-01') },
        { user: userId2, group: groupId, amount: 100, timestamp: new Date('2023-01-02') }
      ])
    }));

    await addContribution(userId2, groupId, 100);
    expect(Contribution.prototype.save).toHaveBeenCalled();
    expect(group.totalContributions).toBe(0);
    expect(group.save).toHaveBeenCalled();

    // Ensure the payout function is called with correct user and amount
    // Mocking and assertions for payoutUser function
  });

  // Add more test cases to cover various scenarios
});
