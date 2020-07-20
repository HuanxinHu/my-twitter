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

exports.getTweetsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const tweets = await Tweet.find({ createdBy: userId })
    .populate('commentsCount')
    .sort('-createdAt');

  if (!tweets) {
    return next(
      new ErrorResponse(`Tweets not found created by user id of ${userId}`, 404)
    );
  }
  res.status(201).json({ success: true, data: tweets });
});

exports.getTweetById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const tweet = await Tweet.findById(id).populate('comments');

  if (!tweet) {
    return next(new ErrorResponse(`Tweet not found with id of ${id}`, 404));
  }

  res.status(201).json({ success: true, data: tweet });
});

exports.deleteTweetById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const tweet = await Tweet.findById(id);
  console.log('user ===>', user, tweet);

  if (!tweet) {
    return next(new ErrorResponse(`Tweet not found with id of ${id}`, 404));
  }

  if (tweet.createdBy != user.id) {
    return next(
      new ErrorResponse(
        `You are not authroized to delete tweet with id of ${id}`,
        404
      )
    );
  }

  await tweet.remove();
  res.status(201).json({ success: true, data: tweet });
});

exports.likeTweetById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return next(new ErrorResponse(`Tweet not found with id of ${id}`, 404));
  }

  const findIndex = tweet.likes.indexOf(user.id);

  if (findIndex === -1) {
    tweet.likes.push(user.id);
  }

  await tweet.save();

  res.status(201).json({ success: true, data: tweet });
});

exports.unlikeTweetById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return next(new ErrorResponse(`Tweet not found with id of ${id}`, 404));
  }

  tweet.likes.pull(user.id);

  await tweet.save();

  res.status(201).json({ success: true, data: tweet });
});
