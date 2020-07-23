const mongoose = require('mongoose');
const { toJSON } = require('../utils/util');

const CommentSchema = new mongoose.Schema(
  {
    commentator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    commentFor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      maxlength: 300,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CommentSchema.virtual('commentatorInfo', {
  ref: 'User',
  localField: '_id',
  foreignField: 'commentator',
  justOne: true,
});

CommentSchema.method('toJSON', toJSON());

module.exports = mongoose.model('Comment', CommentSchema);
