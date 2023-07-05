const Post = require('../models/Post');
const User = require('../models/user');


const postId = async (req, res) => {
    const  {id}  = req.params;
    const userDoc = await User.findById( id )
    const result = await Post.find({ author: { $in: userDoc._id } })
    const data = {userDoc, result}
    res.json(data);
    console.log(data);
}

module.exports = postId;