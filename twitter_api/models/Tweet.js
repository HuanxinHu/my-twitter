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
  likes: [mongoose.Schema.ObjectId],
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
        commentator: {
          type: mongoose.Schema.ObjectId,
        },
      },
    ],
  },
});

TweetSchema.method('toJSON', toJSON());

module.exports = mongoose.model('Tweet', TweetSchema);
