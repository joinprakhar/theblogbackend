const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";

const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.find({ email })
    const userDocs = userDoc[0]
    const passOk = bcrypt.compareSync(password, userDocs.password);
    if (passOk) {
        const Name = userDocs.firstName + " " + userDocs.lastName
        //logedIn
        jwt.sign({ email, id: userDocs._id, Name}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDocs._id,
                email,
                Name
            });
        });
        //res.json()
    } else {
        res.status(400).json('wrong Credentials')
    }
}

module.exports =login