const express = require('express');
const authController = require('../controllers/authController');
const { validate, validateUser } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register', validate(validateUser), authController.register);
router.post('/login', validate(validateUser), authController.login);

module.exports = router;
