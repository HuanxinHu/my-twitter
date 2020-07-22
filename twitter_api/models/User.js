const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { toJSON } = require('../utils/util');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 25,
    },
    avatar: {
      type: String,
    },
    username: {
      type: String,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    bio: {
      type: String,
      maxlength: 60,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    gender: {
      type: String,
      // required: [true, 'Please add a gender'],
      enum: ['male', 'female', 'Male', 'Female'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // select false means this column will not select by model.findByXXX
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    following: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
    },
    followers: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual('tweets', {
  ref: 'Tweet',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false,
});

UserSchema.virtual('tweetsCount', {
  ref: 'Tweet',
  localField: '_id',
  foreignField: 'createdBy',
  count: true,
});

UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'commentator',
  justOne: false,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const restToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(restToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return restToken;
};

// when login register get new user, return the user without some model meta data fields
UserSchema.method('toJSON', toJSON(['password']));

module.exports = mongoose.model('User', UserSchema);
