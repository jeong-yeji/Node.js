// import middleware
const express = require('express');
const morgan = require('morgan');
const winston = require('./config/winston');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const socket = require('socket.io');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const Post = require('./models/Post');
const User = require('./models/User');
const helmet = require('helmet');
const hpp = require('hpp');

const port = process.env.PORT || 3000; // 포트 설정
const onlineChatUsers = {}; // 채팅 유저 저장

dotenv.config(); // .env 파일 사용

// import router
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const app = express();

app.set('view engine', 'ejs');

// middleware
if (process.env.NODE_ENV === 'production') {
    // app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
app.use(cookieParser(process.env.SECRET));
const sessOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    },
};
if (process.env.NODE_ENV === 'production') {
    // sessOptions.proxy = true;
    // sessOptions.cookie.secure = true;
}
app.use(session(sessOptions));
app.use(flash());

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware: body parse를 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // 정적 파일을 서비스할 폴더 지정

// MongoDB Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/facebook_clone', {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUndefinedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// Template 파일에 user, Authentication, flash 관련 변수 전송
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.login = req.isAuthenticated();
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Routers
app.use('/', userRoutes);
app.use('/', postRoutes);

// connect server
const server = app.listen(port, () => {
    console.log('App is running on port ' + port);
});

// WebSocket setup
const io = socket(server); // http 통신을 하는 express 서버와 연결

const room = io.of('/chat');
room.on('connection', (socket) => {
    console.log('new user : ', socket.id);

    // room.emit() : 모든 사용자에게 메시지 전송
    // socket.on() : 특정 이벤ㄴ트에만 메시지 전송

    // 새로운 사용자가 들어왔을 때
    room.emit('newUser', { socketID: socket.id });
    socket.on('newUser', (data) => {
        if (!(data.name in onlineChatUsers)) {
            onlineChatUsers[data.name] = data.socketID;
            socket.name = data.name;
            room.emit('updateUserList', Object.keys(onlineChatUsers));
            console.log('Online users : ' + Object.keys(onlineChatUsers));
        }
    });

    // 사용자가 나갔을 때
    socket.on('disconnect', () => {
        delete onlineChatUsers[socket.name];
        room.emit('updateUserList', Object.keys(onlineChatUsers));
        console.log('Online users : ' + Object.keys(onlineChatUsers));
    });

    // 사용자가 메시지를 보냈을 때
    socket.on('chat', (data) => {
        console.log(data);
        if (data.to === 'Global Chat') {
            room.emit('chat', data);
        } else if (data.to) {
            room.to(onlineChatUsers[data.name]).emit('chat', data);
            room.to(onlineChatUsers[data.to]).emit('chat', data);
        }
    });
});
