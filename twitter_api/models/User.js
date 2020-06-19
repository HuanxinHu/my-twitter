const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
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
  gender: {
    type: String,
    required: [true, 'Please add a gender'],
    enum: ['male', 'female', 'Male', 'Female'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, // select false means this column will not select by model.findByXXX
  },
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
});

module.exports = mongoose.model('User', UserSchema);
