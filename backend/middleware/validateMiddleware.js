const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

const validateUser = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const validateBirth = [
  body('childName').trim().notEmpty().withMessage('Child name is required'),
  body('fatherName').trim().notEmpty().withMessage('Father name is required'),
  body('motherName').trim().notEmpty().withMessage('Mother name is required'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Invalid date of birth'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('placeOfBirth').trim().notEmpty().withMessage('Place of birth is required'),
];

const validateDeath = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('dateOfDeath').isISO8601().toDate().withMessage('Invalid date of death'),
  body('placeOfDeath').trim().notEmpty().withMessage('Place of death is required'),
  body('causeOfDeath').trim().notEmpty().withMessage('Cause of death is required'),
];

const validateMarriage = [
  body('groomName').trim().notEmpty().withMessage('Groom name is required'),
  body('brideName').trim().notEmpty().withMessage('Bride name is required'),
  body('dateOfMarriage').isISO8601().toDate().withMessage('Invalid date of marriage'),
  body('placeOfMarriage').trim().notEmpty().withMessage('Place of marriage is required'),
  body('witnesses').isArray({ min: 2 }).withMessage('At least two witnesses required'),
];

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }
    next();
  };
};

exports.validateUser = validateUser;
exports.validateBirth = validateBirth;
exports.validateDeath = validateDeath;
exports.validateMarriage = validateMarriage;
