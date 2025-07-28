const MarriageRegistration = require('../models/marriageRegistration');
const AppError = require('../utils/appError');

/**
 * Create new marriage registration
 * @param {Object} data - Marriage registration data
 * @returns {Promise<Object>} Created registration
 */
exports.createMarriageRegistration = async (data, userId) => {
  return await MarriageRegistration.create({ ...data, userId });
};

/**
 * Get all marriage registrations with pagination and filtering
 * @param {Object} query - Query parameters
 * @param {string} role - User role
 * @param {string} userId - User ID
 */
exports.getAllMarriageRegistrations = async (query, role, userId) => {
  const { page = 1, limit = 10, status } = query;
  const offset = (page - 1) * limit;
  
  const where = role === 'admin' ? (status ? { status } : {}) : { userId, ...(status && { status }) };
  
  return await MarriageRegistration.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });
};

/**
 * Update marriage registration status (admin only)
 * @param {string} id - Registration ID
 * @param {string} status - New status
 */
exports.updateMarriageStatus = async (id, status) => {
  const registration = await MarriageRegistration.findByPk(id);
  if (!registration) {
    throw new AppError('Marriage registration not found', 404);
  }
  
  registration.status = status;
  await registration.save();
  return registration;
};
