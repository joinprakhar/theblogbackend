const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";



const profile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            //if (err) throw err;
            res.json(info);
        });}
    else{
    }  
};

module.exports = profile;