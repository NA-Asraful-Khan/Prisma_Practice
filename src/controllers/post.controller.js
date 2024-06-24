const cloudinary = require('../utils/cloudinary');
const PostModel = require("../models/post.model");
const { postValidate } = require("../validate/Post.validate");
const fs = require('fs');



const createPost = async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.userData.userId;

    if (!req.files || !req.files.image) {
        return res.status(400).json({
            message: "Image file is required",
        });
    }

    let image = req.files.image;

    // Validation
    const validateResponse = postValidate(req.body);
    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            error: validateResponse,
        });
    }

    try {
        // Upload the image to Cloudinary and transform to AVIF
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
            format: 'avif', // Convert to AVIF format
            quality: 'auto' // Automatically optimize quality
        });
        const imageUrl = uploadResult.secure_url;

        // Create post
        const postData = { title, content, imageUrl, authorId };
        const createdPost = await PostModel.createPost(postData);

        // Clean up the temp file
        fs.unlink(image.tempFilePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });

        res.status(201).json({
            message: "Post Created Successfully",
            post: createdPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            error: error.message || "Internal Server Error",
        });
    }
};

const showAllPost = async (req, res) => {
    try {
        const users = await PostModel.showAllPost();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const showSinglePost = async (req, res) => {};

module.exports = {
    createPost,
    showAllPost,
    showSinglePost,
};
