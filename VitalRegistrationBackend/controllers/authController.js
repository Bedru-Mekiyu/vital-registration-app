const authService = require('../services/authService');
const AppError = require('../utils/appError');

/**
 * Register new user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;
    const { user, token } = await authService.register({ fullName, email, password, role });

    res.status(201).json({
      status: 'success',
      data: { user: { id: user.id, fullName, email, role }, token }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      data: { user: { id: user.id, fullName: user.fullName, email, role: user.role }, token }
    });
  } catch (err) {
    next(err);
  }
};
