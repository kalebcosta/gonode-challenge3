const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Comment', CommentSchema);
