const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";

const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })
    //const userDocs = userDoc[0]
    //console.log(userDoc)
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        const Name = userDoc.firstName + " " + userDoc.lastName
        //logedIn
        jwt.sign({ email, id: userDoc._id, Name}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                email,
                Name
            });
        });
        console.log("done")
        //res.json()
    } else {
        res.status(400).json('wrong Credentials')
        console.log("notdone")
    }
}

module.exports =login