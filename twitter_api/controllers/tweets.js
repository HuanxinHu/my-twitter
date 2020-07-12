const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Tweet = require('../models/Tweet');

exports.createTweet = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const userId = req.params.userId;

  if (userId !== req.user.id) {
    return next(
      new ErrorResponse(
        `Current user ${req.user.id} is not authorized to create tweet with user id ${userId}`,
        404
      )
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  const tweet = await Tweet.create({ content, createdBy: userId });
  res.status(201).json({ success: true, data: tweet });
});
