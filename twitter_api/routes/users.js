const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../controllers/users');
const tweetsRouter = require('./tweets');

router.use('/:userId/tweets', tweetsRouter);

router.route('/').get(getUsers);

router.route('/:id').get(getUser);

module.exports = router;
