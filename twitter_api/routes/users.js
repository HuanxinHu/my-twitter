const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../controllers/users');
const blogsRouter = require('./blogs');

router.use('/:userId/blogs', blogsRouter);

router.route('/').get(getUsers);

router.route('/:id').get(getUser);

module.exports = router;
