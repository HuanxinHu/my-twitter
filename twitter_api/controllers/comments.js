const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Comment = require('../models/Comment');

exports.commentTweetById = asyncHandler(async (req, res, next) => {
  const tweetId = req.params.tweetId;
  const user = req.user;
  const { content } = req.body;
  const comment = await Comment.create({
    commentator: user.id,
    commentFor: tweetId,
    content: content,
  });

  res.status(201).json({ success: true, data: comment });
});
