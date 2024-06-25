const express = require('express');
const PostController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth')
const imageUploader = require('../helpers/image-uploader')
const router = express.Router();

//Create Post
router.post('/',checkAuthMiddleware.checkAuth,PostController.createPost)
router.get('/',PostController.showAllPost)
router.get('/:id',PostController.showSinglePost)
router.put('/:id',checkAuthMiddleware.checkAuth,PostController.updatePost)
router.delete('/:id',checkAuthMiddleware.checkAuth,PostController.deletePost)



module.exports = router;