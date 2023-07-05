const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const logout = (req, res) => {
    res.cookie('token', '').json('ok');
}

module.exports = logout;