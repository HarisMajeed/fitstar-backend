const User = require('../models/User');
const JWT = require('jsonwebtoken');
var randomNumber = require('random-number');
const constant = require('../constants/ConstantMessages');
require('dotenv').config();


/** User Access Token */
exports.loginToken = async (user) => {
    try {
        let loginTime = new Date();
         const token = JWT.sign({ id: user._id,  email: user.email, phone: user.phone, firstName: user.firstName, lastName: user.lastName, role: user.role, lastLogin: loginTime }, process.env.JWT_SECRET, { expiresIn: '720h' });
        const refreshToken = JWT.sign({ id: user._id,  email: user.email, phone: user.phone, firstName: user.firstName, lastName: user.lastName, role: user.role, lastLogin: loginTime }, process.env.JWT_SECRET);
        await User.updateOne({ email: user.email }, { tokenStatus: true, lastLogin: loginTime });

        return { message: constant.LOGIN_SUCCESS, token: token, user, refreshToken };
    } catch (error) {
        return { status: false, message: error.message };
    }
};

/** Number Generator */
exports.numberGenerator = randomNumber.generator({
    min: 100000,
    max: 999999,
    integer: true
});







