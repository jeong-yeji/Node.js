const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// 사용자 스키마
let UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    profile: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // FK같은거
            ref: 'Post',
        },
    ],
    liked_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    liked_comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

// 사용자 인증을 위해 passport-local-mongoose 모듈과 스키마 연결
UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);
module.exports = User;
