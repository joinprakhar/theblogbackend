const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'api/uploads' });


dotenv.config();

app.use(cors({
    credentials: true,
    origin: ['https://theblogpost.netlify.app',
     'http://localhost:3000',
     'https://thepost.vercel.app']
}))

///http://localhost:3000 origin: ["www.one.com","www.two.com","www.three.com"];
app.use(express.json())
app.use(cookieParser());
app.use('', express.static(__dirname + 'api/uploads'));


const login = require('./controller/login');
const profile = require('./controller/profile');
const logout = require('./controller/logout');
const register = require('./controller/register');
const create = require('./routes/create')
const update = require('./routes/update')
const readPost = require('./routes/read')
const postId = require('./routes/postId')
const deletePost = require('./routes/deletePost')
const userInfo = require('./controller/userInfo');
const createComment = require('./routes/createComment')
const Comment = require('./routes/readComment')

mongoose.connect('mongodb+srv://test:test@blog1.tgkws1w.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)

app.post('/createComment', uploadMiddleware.single('file'), createComment);
app.post('/post', uploadMiddleware.single('file'), create);
app.put('/post/', uploadMiddleware.single('file'), update);
app.delete('/post', uploadMiddleware.single('file'), deletePost);

app.get('/profile', profile)
app.get('/post', readPost);
app.get('/post/:id', postId)
app.get('/user/:id', userInfo)
app.get('/comment/:id', Comment)

app.listen(4000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", "4000");
});