const express = require('express');
const marriageController = require('../controllers/marriageController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { validate, validateMarriage } = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(validate(validateMarriage), marriageController.createMarriageRegistration)
  .get(marriageController.getAllMarriageRegistrations);

router
  .route('/:id/status')
  .patch(restrictTo('admin'), marriageController.updateMarriageStatus);

router
  .route('/:id/certificate')
  .get(restrictTo('admin'), marriageController.generateMarriageCertificate);

module.exports = router; 
