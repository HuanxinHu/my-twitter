const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Blog = require('../models/Blog');

exports.createBlog = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const userId = req.params.userId;

  if (userId !== req.user.id) {
    return next(
      new ErrorResponse(
        `Current user ${req.user.id} is not authorized to create blog with user id ${userId}`,
        404
      )
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  const blog = await Blog.create({ content, createdBy: userId });
  res.status(201).json({ success: true, data: blog });
});
