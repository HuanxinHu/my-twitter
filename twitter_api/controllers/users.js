const path = require('path');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const { Error } = require('mongoose');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('tweets');

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

exports.updateUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }

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

  console.log(req.files.file);

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

    await user.update({ avatar: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});
