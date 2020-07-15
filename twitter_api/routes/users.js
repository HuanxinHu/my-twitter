const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUserById } = require('../controllers/users');
const { protect } = require('../middleware/auth');
const tweetsRouter = require('./tweets');

router.use('/:userId/tweets', tweetsRouter);

router.route('/').get(getUsers);

router.route('/:id').get(getUser).post(protect, updateUserById);

module.exports = router;
