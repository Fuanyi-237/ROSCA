const User = require('../models/user');

exports.getUsers = async () => {
    return User.find();
};

exports.getUserById = async (userId) => {
    return User.findById(userId);
};
