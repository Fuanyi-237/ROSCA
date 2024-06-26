const Group = require('../models/group');

exports.createGroup = async (groupData) => {
    const group = new Group(groupData);
    await group.save();
    return group;
};

exports.getGroups = async () => {
    return Group.find().populate('president').populate('members');
};

exports.getGroupById = async (groupId) => {
    return Group.findById(groupId).populate('president').populate('members');
};

exports.addMember = async (groupId, userId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    group.members.push(userId);
    await group.save();
    return group;
};
