const express = require('express');
const app = express();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";
app.use(cookieParser());

const create = async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        console.log(info)
        const { title, summary, content, image, category } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            image,
            category,
            cover: newPath,
            filepath: path,
            author: info.id
        });
        res.json(postDoc);
    // op = {title, summary, content, image, category, newPath}
    //     console.log(newPath);
    });

}

module.exports = create;

