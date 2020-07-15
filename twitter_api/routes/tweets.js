const express = require('express');
const {
  createTweet,
  getTweetsByUserId,
  getTweetById,
} = require('../controllers/tweets');
const { protect } = require('../middleware/auth');

// for users router include tweets router, option mergeParams
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createTweet).get(getTweetsByUserId);

router.route('/:id').get(getTweetById);

module.exports = router;
