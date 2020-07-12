const express = require('express');
const { createTweet } = require('../controllers/tweets');
const { protect } = require('../middleware/auth');

// for users router include tweets router, option mergeParams
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createTweet);

module.exports = router;
