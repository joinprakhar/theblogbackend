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
        const token = jwt.sign({ email, id: userDoc._id, Name }, secret);
        res.json({ 
            token, 
            id: userDoc._id,
            email,
            Name,
        })
    }else {
        res.status(400).json('wrong Credentials')
    }
};

module.exports = login







// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const userDoc = await User.findOne({ email })
    
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//         const Name = userDoc.firstName + " " + userDoc.lastName
//         //logedIn
//         const token = jwt.sign({ email, id: userDoc._id, Name }, secret);
        
//         res.cookie('token', token, {
//             httpOnly: true,
//             sameSite: "none",
//             domain: "theblogpost.netlify.app",
//             secret: true,

//         } ).json({
//                 id: userDoc._id,
//                 email,
//                 Name,
//                 token,
                
//             });
        
        
//     } else {
//         res.status(400).json('wrong Credentials')
//         console.log("notdone")
//     }
// }

// module.exports = login
