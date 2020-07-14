const express = require('express');
const { createTweet, getTweetsByUserId } = require('../controllers/tweets');
const { protect } = require('../middleware/auth');

// for users router include tweets router, option mergeParams
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createTweet).get(getTweetsByUserId);

module.exports = router;
