const mongoose = require('mongoose');
const { Schema, model } = mongoose

const PostSchema = new Schema({
    content: String,    
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    postComment: {
        type: Schema.Types.ObjectId, ref: 'Post'
    },
}, {
    timestamps: true
});

const PostModel = model('Comment', PostSchema)

module.exports = PostModel;