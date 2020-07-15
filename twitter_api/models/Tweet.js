const mongoose = require('mongoose');
const { toJSON } = require('../utils/util');

const TweetSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  likes: {
    type: Number,
    min: 0,
  },
  comments: {
    type: [
      {
        createdAt: {
          type: Date,
          default: Date.now,
        },
        comment: {
          type: String,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
});

TweetSchema.method('toJSON', toJSON());

module.exports = mongoose.model('Tweet', TweetSchema);
