const Group = require('../models/group');
const groupService = require('../services/groupService');

exports.createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await groupService.getGroups();
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        res.status(200).json(group);
    } catch (error) {
        res.status(404).json({ message: 'Group not found' });
    }
};

exports.addMember = async (req, res) => {
    try {
        const group = await groupService.addMember(req.params.id, req.body.userId);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
