const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('blogs');

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

exports.updateUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { avatar, name, bio, location, website } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      avatar,
      name,
      bio,
      location,
      website,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(
      new ErrorResponse(`User not fund with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, user });
});
