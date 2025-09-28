const birthService = require('../services/birthService');
const pdfService = require('../services/pdfService');
const AppError = require('../utils/appError');

/**
 * Create birth registration
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createBirthRegistration = async (req, res, next) => {
  try {
    const registration = await birthService.createBirthRegistration(req.body, req.user.id);
    res.status(201).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all birth registrations
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllBirthRegistrations = async (req, res, next) => {
  try {
    const { rows, count } = await birthService.getAllBirthRegistrations(req.query, req.user.role, req.user.id);
    res.status(200).json({
      status: 'success',
      results: count,
      data: rows
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update birth registration status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateBirthStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const registration = await birthService.updateBirthStatus(req.params.id, status);
    res.status(200).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Generate birth certificate PDF
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.generateBirthCertificate = async (req, res, next) => {
  try {
    const registration = await BirthRegistration.findByPk(req.params.id);
    if (!registration) {
      return next(new AppError('Birth registration not found', 404));
    }
    
    const pdfBuffer = await pdfService.generateCertificate(registration, 'birth');
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=birth-certificate-${registration.id}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};
