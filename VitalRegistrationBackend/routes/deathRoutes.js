const express = require('express');
const deathController = require('../controllers/deathController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { validate, validateDeath } = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(validate(validateDeath), deathController.createDeathRegistration)
  .get(deathController.getAllDeathRegistrations);

router
  .route('/:id/status')
  .patch(restrictTo('admin'), deathController.updateDeathStatus);

router
  .route('/:id/certificate')
  .get(restrictTo('admin'), deathController.generateDeathCertificate);

module.exports = router;
