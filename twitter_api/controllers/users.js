const path = require('path');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});

// GET /api/v1/users/:id
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

// Private GET /api/v1/users/:id/profile
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).populate({
    path: 'tweets',
    options: { sort: { createdAt: -1 } },
    model: 'Tweet',
    populate: { path: 'commentsCount' },
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

// POST /api/v1/users/:id
exports.updateUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let user = await User.findById(id);
  const updateData = { ...req.body };

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }

  if (user.username) {
    delete updateData.username;
  }

  Object.keys(updateData).forEach((key) => (user[key] = updateData[key]));
  user = await user.save({ validateBeforeSave: true });

  res.status(200).json({ success: true, user });
});

// PUT /api/v1/users/:id/avatar
exports.uploadUserAvatar = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 404));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return newxt(new ErrorResponse('Please upload a image file', 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload image less than ${process.env.MAX_FILE_UPLOAD / 1000}KB`,
        400
      )
    );
  }

  file.name = `avatar_${user.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Faild to upload file', 500));
    }

    await user.updateOne({ avatar: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});
