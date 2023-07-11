const express = require('express');
const app = express();
const Post = require('./Post');
const Comment = require('./commentSchema')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";
app.use(cookieParser());

const createComment = async (req, res) => {
    const { userid, comment, blogId } = req.body;
    console.log(userid, comment, blogId);

    try {
        let commentDoc = await Comment.findOne({ blog: blogId });

        if (!commentDoc) {
            commentDoc = new Comment({ blog: blogId, comments: [] });
        }

        commentDoc.comments.push({ userid, comment });
        await commentDoc.save();

        res.json({ success: true });
    } catch (err) {
        console.error('Error saving comment:', err);
        res.status(500).json({ error: 'Failed to save comment' });
    }

}
module.exports = createComment;