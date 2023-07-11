const mongoose = require('mongoose');
const { Schema, model } = mongoose

const CommentSchema = new mongoose.Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    comments: [
        {
            userid: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true
});

const CommentModel = model('Comment', CommentSchema)

module.exports = CommentModel;