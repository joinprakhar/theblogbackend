const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const secret = "76b7u76u7u6bfxnghnchg7yjyujjjy";

const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })
    
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        const Name = userDoc.firstName + " " + userDoc.lastName
        //logedIn
        const token = jwt.sign({ email, id: userDoc._id, Name }, secret, { expiresIn: '1h' })
            
        res.cookie('token', token).json({
                id: userDoc._id,
                email,
                Name
            });
        
        console.log("token", token);
        res.status(200).json({ message: 'Login successful', token });
        //res.json()
    } else {
        res.status(400).json('wrong Credentials')
        console.log("notdone")
    }
}

module.exports = login