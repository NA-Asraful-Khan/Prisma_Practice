const express = require('express')
const router = express.Router();
const imagesController = require('../controllers/image.controllers')
const imageUploader = require('../helpers/image-uploader')
const checkAuthMiddleware = require('../middleware/check-auth')


router.post('/upload',checkAuthMiddleware.checkAuth,imageUploader.upload.single('image'),imagesController.upload)










module.exports = router;