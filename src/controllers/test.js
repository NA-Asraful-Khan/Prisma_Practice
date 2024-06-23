const PostModel = require('../models/post.model')
// const { postValidate } = require('../validate/Post.validate')
const cloudinary = require('../utils/cloudinary')

const createPost = async (req, res) => {
    const { title, content,image} = req.body;
    

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    const authorId = req.userData.userId;

    // Validation
    const validateResponse = postValidate(req.body);
    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            error: validateResponse
        });
    }

    try {

        const imgResult = await cloudinary.uploader.upload(image,{
            folder:"products",
            width:300,
            crop:"scale"
        })
        // Create post
        const postData = {
            title,
            content,
            imageUrl,
            authorId
        }
        const createdPost = await PostModel.createPost(postData);

        res.status(201).json({
            message: "Post Created Successfully",
            post: createdPost
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            error: error.message || "Internal Server Error"
        });
    }
};

const showAllPost=async (req, res) => {
    try {
      const users = await PostModel.showAllPost();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const showSinglePost=async(req,res)=>{
    
}




module.exports = {
    createPost,
    showAllPost
}