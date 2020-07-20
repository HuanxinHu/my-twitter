const mongoose = require('mongoose');
const { toJSON } = require('../utils/util');

const TweetSchema = new mongoose.Schema(
  {
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
      maxlength: 140,
    },
    likes: [mongoose.Schema.ObjectId],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TweetSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'commentFor',
  justOne: false,
});

TweetSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'commentFor',
  count: true,
});

TweetSchema.method('toJSON', toJSON());

module.exports = mongoose.model('Tweet', TweetSchema);
