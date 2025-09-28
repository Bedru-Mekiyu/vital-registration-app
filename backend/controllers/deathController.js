const deathService = require('../services/deathService');
const pdfService = require('../services/pdfService');
const AppError = require('../utils/appError');

/**
 * Create death registration
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createDeathRegistration = async (req, res, next) => {
  try {
    const registration = await deathService.createDeathRegistration(req.body, req.user.id);
    res.status(201).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all death registrations
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllDeathRegistrations = async (req, res, next) => {
  try {
    const { rows, count } = await deathService.getAllDeathRegistrations(req.query, req.user.role, req.user.id);
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
 * Update death registration status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateDeathStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const registration = await deathService.updateDeathStatus(req.params.id, status);
    res.status(200).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Generate death certificate PDF
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.generateDeathCertificate = async (req, res, next) => {
  try {
    const registration = await DeathRegistration.findByPk(req.params.id);
    if (!registration) {
      return next(new AppError('Death registration not found', 404));
    }
    
    const pdfBuffer = await pdfService.generateCertificate(registration, 'death');
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=death-certificate-${registration.id}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};
