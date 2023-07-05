const Post = require('../models/Post');

const postId = async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['firstName', 'lastName']);
    res.json(postDoc);
}

module.exports = postId;