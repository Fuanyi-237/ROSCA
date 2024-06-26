const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
};

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
