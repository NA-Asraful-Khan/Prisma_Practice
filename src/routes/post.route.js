const express = require('express');
const PostController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router();

//Create Post
router.post('/',checkAuthMiddleware.checkAuth,PostController.createPost)
router.get('/',PostController.showAllPost)



module.exports = router;