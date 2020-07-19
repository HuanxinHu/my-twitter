const express = require('express');
const {
  createTweet,
  getTweetsByUserId,
  getTweetById,
  deleteTweetById,
  likeTweetById,
  unlikeTweetById,
} = require('../controllers/tweets');
const { protect } = require('../middleware/auth');

// for users router include tweets router, option mergeParams
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createTweet).get(getTweetsByUserId);

router.route('/:id').get(getTweetById).delete(protect, deleteTweetById);
router.route('/like/:id').post(protect, likeTweetById);
router.route('/unlike/:id').post(protect, unlikeTweetById);

module.exports = router;
