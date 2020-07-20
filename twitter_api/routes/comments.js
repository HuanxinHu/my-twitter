const express = require('express');
const router = express.Router();
const { commentTweetById } = require('../controllers/comments');
const { protect } = require('../middleware/auth');

router.route('/tweet/:tweetId').post(protect, commentTweetById);

module.exports = router;
