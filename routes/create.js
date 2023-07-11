const express = require('express');
const app = express();
const User = require('../controller/User');
const Post = require('./Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";
app.use(cookieParser());

const create = async (req, res) => {
    const { title, summary, content, image, category, email } = req.body;
    const userDoc = await User.findOne({ email })
    const postDoc = await Post.create({
            title,
            summary,
            content,
            image,
            category,
            author: userDoc._id
        });
        res.json(postDoc);
}
module.exports = create; 

