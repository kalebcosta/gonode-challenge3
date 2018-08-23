const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

module.exports = {
  async toggle(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(400).json({ error: "Comment doesn't exist" });
      }

      const liked = comment.likes.indexOf(req.userId);

      if (liked === -1) {
        comment.likes.push(req.userId);
      } else {
        comment.likes.splice(liked, 1);
      }

      await comment.save();
      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  }
};
