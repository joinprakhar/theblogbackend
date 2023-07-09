const express = require('express');
const app = express();
const Post = require('./Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";
app.use(cookieParser());

const update = async (req, res) => {

    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    
        const { id, title, summary, content, image, userId} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) == JSON.stringify(userId);   
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await Post.findByIdAndUpdate(postDoc._id, {
            title,
            summary,
            content,
            image,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
        

}

module.exports = update;