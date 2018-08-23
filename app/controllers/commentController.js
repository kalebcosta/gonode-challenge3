const mongoose = require('mongoose');

const currentComment = mongoose.model('Comment');
const Post = mongoose.model('Post');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      const comment = await currentComment.create({
        ...req.body,
        user: req.userId,
        post: post.id
      });

      post.comments.push(comment);
      await post.save();
      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const post = await Post.findById(req.params.id).populate('comments');

      const { comments } = post;

      const listComments = comments.map(comment => comment);

      return res.json(listComments);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const comment = await currentComment.findById(req.params.id);
      const post = await Post.findById(comment.post._id);

      post.comments.splice(post.comments.indexOf(req.params.id), 1);
      post.save();

      await comment.remove();
      return res.send();
    } catch (err) {
      return next(err);
    }
  }
};
