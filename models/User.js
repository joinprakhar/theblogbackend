const mongoose = require('mongoose');
const { Schema, model } = mongoose

const UsereSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
})

const UserModel = model('User', UsereSchema)

module.exports = UserModel;