const marriageService = require('../services/marriageService');
const pdfService = require('../services/pdfService');
const AppError = require('../utils/appError');

/**
 * Create marriage registration
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createMarriageRegistration = async (req, res, next) => {
  try {
    const registration = await marriageService.createMarriageRegistration(req.body, req.user.id);
    res.status(201).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all marriage registrations
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllMarriageRegistrations = async (req, res, next) => {
  try {
    const { rows, count } = await marriageService.getAllMarriageRegistrations(req.query, req.user.role, req.user.id);
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
 * Update marriage registration status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateMarriageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const registration = await marriageService.updateMarriageStatus(req.params.id, status);
    res.status(200).json({
      status: 'success',
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Generate marriage certificate PDF
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.generateMarriageCertificate = async (req, res, next) => {
  try {
    const registration = await MarriageRegistration.findByPk(req.params.id);
    if (!registration) {
      return next(new AppError('Marriage registration not found', 404));
    }
    
    const pdfBuffer = await pdfService.generateCertificate(registration, 'marriage');
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=marriage-certificate-${registration.id}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};
