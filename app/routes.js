const express = require('express');
const requireDir = require('require-dir');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
const controllers = requireDir('./controllers');

/**
 * Auth
 */

routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * ====================
 * Authenticated Routes
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.get('/users/me', controllers.userController.me);
routes.put('/users', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Friends
 */
routes.post('/add/:id', controllers.friendController.create);
routes.delete('/remove/:id', controllers.friendController.destroy);

/**
 * Posts
 */
routes.post('/posts', controllers.postController.create);
routes.delete('/posts/:id', controllers.postController.destroy);

/**
 * Comments
 */
routes.get('/comment/:id', controllers.commentController.show);
routes.post('/comment/:id', controllers.commentController.create);
routes.delete('/comment/:id', controllers.commentController.destroy);

/**
 * Likes (Posts and Comments)
 */
routes.post('/likepost/:id', controllers.likePostController.toggle);
routes.post('/likecomment/:id', controllers.likeCommentController.toggle);

module.exports = routes;
