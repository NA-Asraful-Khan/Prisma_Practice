const express = require('express');
const PostController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth')
const imageUploader = require('../helpers/image-uploader')
const router = express.Router();

//Create Post
router.post('/',checkAuthMiddleware.checkAuth,imageUploader.upload.single('image'),PostController.createPost)
router.get('/',PostController.showAllPost)



module.exports = router;