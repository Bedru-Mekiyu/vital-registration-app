const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AppError = require('../utils/appError');

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.register = async (userData) => {
  const user = await User.create(userData);
  const token = signToken(user.id);
  return { user, token };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const token = signToken(user.id);
  return { user, token };
};
