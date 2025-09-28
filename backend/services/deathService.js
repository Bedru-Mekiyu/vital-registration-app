const DeathRegistration = require('../models/deathRegistration');
const AppError = require('../utils/appError');

/**
 * Create new death registration
 * @param {Object} data - Death registration data
 * @returns {Promise<Object>} Created registration
 */
exports.createDeathRegistration = async (data, userId) => {
  return await DeathRegistration.create({ ...data, userId });
};

/**
 * Get all death registrations with pagination and filtering
 * @param {Object} query - Query parameters
 * @param {string} role - User role
 * @param {string} userId - User ID
 */
exports.getAllDeathRegistrations = async (query, role, userId) => {
  const { page = 1, limit = 10, status } = query;
  const offset = (page - 1) * limit;
  
  const where = role === 'admin' ? (status ? { status } : {}) : { userId, ...(status && { status }) };
  
  return await DeathRegistration.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });
};

/**
 * Update death registration status (admin only)
 * @param {string} id - Registration ID
 * @param {string} status - New status
 */
exports.updateDeathStatus = async (id, status) => {
  const registration = await DeathRegistration.findByPk(id);
  if (!registration) {
    throw new AppError('Death registration not found', 404);
  }
  
  registration.status = status;
  await registration.save();
  return registration;
};
