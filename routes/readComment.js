const Post = require('./Post');
//const User = require('../models/user');
const Comment = require('./commentSchema');


const postId = async (req, res) => {
    const { id } = req.params;
    const result = await Comment.find({ blog : { $in: id } })
    res.json(result);
}

module.exports = postId;