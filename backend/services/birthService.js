const BirthRegistration = require('../models/birthRegistration');
const AppError = require('../utils/appError');

/**
 * Create new birth registration
 * @param {Object} data - Birth registration data
 * @returns {Promise<Object>} Created registration
 */
exports.createBirthRegistration = async (data, userId) => {
  return await BirthRegistration.create({ ...data, userId });
};

/**
 * Get all birth registrations with pagination and filtering
 * @param {Object} query - Query parameters
 * @param {string} role - User role
 * @param {string} userId - User ID
 */
exports.getAllBirthRegistrations = async (query, role, userId) => {
  const { page = 1, limit = 10, status } = query;
  const offset = (page - 1) * limit;
  
  const where = role === 'admin' ? (status ? { status } : {}) : { userId, ...(status && { status }) };
  
  return await BirthRegistration.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });
};

/**
 * Update birth registration status (admin only)
 * @param {string} id - Registration ID
 * @param {string} status - New status
 */
exports.updateBirthStatus = async (id, status) => {
  const registration = await BirthRegistration.findByPk(id);
  if (!registration) {
    throw new AppError('Birth registration not found', 404);
  }
  
  registration.status = status;
  await registration.save();
  return registration;
};
