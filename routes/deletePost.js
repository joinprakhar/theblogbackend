const express = require('express');
const app = express();
const Post = require('./Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";
app.use(cookieParser());

const deletePost = async (req, res) => {
    try {
        const { id, userId } = req.body;
        const postId = await Post.findById(id);
        const isAuthor = JSON.stringify(postId.author) === JSON.stringify(userId);

        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }

        await Post.findByIdAndRemove(postId._id);

        // Return success response
        res.status(200).json('Post deleted successfully');
    } catch (error) {
        // Return error response
        res.status(500).json('An error occurred while deleting the post');
    }
};


// const deletePost = async (req, res) => {
    
//         const { id , userId } = req.body;
//         const postId = await Post.findById(id);
//         const isAuthor = JSON.stringify(postId.author) == JSON.stringify(userId);
//         if (!isAuthor) {
//             return res.status(400).json('you are not the author');
//         }
//         await Post.findByIdAndRemove(postId._id)
//         res.json(postId);
// }

module.exports = deletePost