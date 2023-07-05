const Post = require('../models/Post');

const readPost = async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
}

module.exports = readPost;

