const express = require('express');
const birthController = require('../controllers/birthController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { validate, validateBirth } = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(validate(validateBirth), birthController.createBirthRegistration)
  .get(birthController.getAllBirthRegistrations);

router
  .route('/:id/status')
  .patch(restrictTo('admin'), birthController.updateBirthStatus);

router
  .route('/:id/certificate')
  .get(restrictTo('admin'), birthController.generateBirthCertificate);

module.exports = router;
