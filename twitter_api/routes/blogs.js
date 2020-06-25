const express = require('express');
const { createBlog } = require('../controllers/blogs');
const { protect } = require('../middleware/auth');

// for users router include blogs router, option mergeParams
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createBlog);

module.exports = router;
