const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  getMe,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/me').get(protect, getMe);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);

module.exports = router;
