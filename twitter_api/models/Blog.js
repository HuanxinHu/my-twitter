const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Blog', BlogSchema);
