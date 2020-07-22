const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUserById,
  uploadUserAvatar,
  getUserProfile,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');
const tweetsRouter = require('./tweets');

router.use('/:userId/tweets', tweetsRouter);

router.route('/').get(getUsers);

router.route('/:id').get(getUser).post(protect, updateUserById);
router.route('/:id/profile').get(protect, getUserProfile);
router.route('/:id/avatar').put(protect, uploadUserAvatar);

module.exports = router;
