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
        console.error('Error fetching posts with author:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const showSinglePost = async (req, res) =>  {
    const id = req.params.id;
    const data={id:id}
    
    try {
        const post = await PostModel.getSinglePost(data);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post Not Found",
            });
        }
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({
            message: "Something Went Wrong",
            error: err.message,
        });
    }
};

const updatePost = async (req, res) => {
    const paramId = req.params.id;
    const { title, content } = req.body;
    const authorId = req.userData.userId;
    let image = req.files ? req.files.image : null;

    try {

        // Retrieve the existing post
        const existingPost = await PostModel.checkPost(paramId);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the current user is the author of the post
        if (existingPost.authorId.toString() !== authorId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        // Update fields only if they are provided
        const updatedPostData = {
            title: title || existingPost.title,
            content: content || existingPost.content,
            imageUrl: image || existingPost.imageUrl, // Will be updated below if image is provided
            authorId: existingPost.authorId
        };

        // If an image is provided, upload it to Cloudinary and update the imageUrl
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
                format: 'avif', // Convert to AVIF format
                quality: 'auto' // Automatically optimize quality
            });
            updatedPostData.imageUrl = uploadResult.secure_url;

            // Clean up the temp file
            fs.unlink(image.tempFilePath, (err) => {
                if (err) console.error("Failed to delete temp file:", err);
            });
        }

        // Update the post
        const updatedPost = await PostModel.updatePost(updatedPostData, paramId);

        res.status(200).json({
            message: "Post Updated Successfully",
            post: updatedPost,
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            error: error.message || "Internal Server Error",
        });
    }
};

const deletePost = async (req, res) => {
    const paramId = req.params.id;
    const authorId = req.userData.userId; // Assuming userData contains the current user's ID

    try {
        // Retrieve the existing post
        const existingPost = await PostModel.checkPost(paramId);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the current user is the author of the post
        if (existingPost.authorId.toString() !== authorId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        // Delete the post
        await PostModel.deletePost(paramId);

        res.status(200).json({
            message: "Post Deleted Successfully",
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            error: error.message || "Internal Server Error",
        });
    }
};



module.exports = {
    createPost,
    showAllPost,
    showSinglePost,
    updatePost,
    deletePost
};
