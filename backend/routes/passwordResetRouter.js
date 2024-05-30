const express = require('express');
const  PasswordResetController  = require('../controllers/passwordResetController');
const router = express.Router();

// router.post('/', PasswordResetController.completePasswordReset)
router.post('/initiate', PasswordResetController.initiatePasswordReset);
router.post('/complete', PasswordResetController.completePasswordReset);

module.exports = router;