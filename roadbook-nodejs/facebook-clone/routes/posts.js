// 게시글 관련 router
const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();
const sanitize = require('sanitize-html');

// multer setup
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    },
});

const imageFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

// cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/user/login');
};

// Routers
// 전체 post 조회
router.get('/', isLoggedIn, (req, res) => {
    User.findById(req.user._id)
        // 친구들의 게시글
        .populate({
            path: 'friends',
            populate: {
                path: 'posts',
                model: 'Post',
            },
        })
        .populate('posts') // 현재 사용자의 게시글
        .exec((err, user) => {
            if (err) {
                console.log(err);
                req.flash(
                    'error',
                    'There has been an error finding all posts.'
                );
                res.render('posts/index');
            } else {
                let posts = [];

                // 친구들의 게시글
                for (let i = 0; i < user.friends.length; i++) {
                    for (let j = 0; j < user.friend[i].posts.length; j++) {
                        posts.push(user.friend[i].posts[j]);
                    }
                }

                // 현재 사용자의 게시글
                for (let i = 0; i < user.posts.length; i++) {
                    posts.push(user.posts[i]);
                }

                if (posts) {
                    res.render('posts/index', { posts: posts });
                } else {
                    res.render('posts/index', { posts: null });
                }
            }
        });
});

// post 좋아요 누르기
router.get('/post/:id/like', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (userErr, user) => {
        if (userErr) {
            console.log(userErr);
            req.flash(
                'error',
                'There has been an error trying to like this post, are you logged in?'
            );
            res.redirect('back');
        } else {
            Post.findById(req.params.id, (postErr, post) => {
                if (postErr) {
                    console.log(postErr);
                    req.flash(
                        'error',
                        'There has been an error trying to find the post, are you sure you are in the correct URL?'
                    );
                    res.redirect('back');
                } else {
                    // 이미 좋아요 했는지 확인
                    for (let i = 0; i < user.liked_posts.length; i++) {
                        if (user.liked_posts[i].equals(post._id)) {
                            req.flash('error', 'You already liked this post.');
                            return res.redirect('back');
                        }
                    }

                    post.likes = post.likes + 1;
                    post.save();

                    user.liked_posts.push(post._id);
                    user.save();

                    req.flash(
                        'success',
                        `You successfully liked ${post.creator.firstName}'s post.`
                    );
                    res.redirect('back');
                }
            });
        }
    });
});

// comment 좋아요 누르기
router.get('/post/:postid/comments/:commentid/like', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (userErr, user) => {
        if (userErr) {
            console.log(userErr);
            req.flash(
                'error',
                'There has been an error trying to like this comment, are you logged in?'
            );
            res.redirect('back');
        } else {
            Comment.findById(req.params.commentid, (commentErr, comment) => {
                if (commentErr) {
                    console.log(commentErr);
                    req.flash(
                        'error',
                        'There has been an error trying to find the comment, are you sure you are in the correct URL?'
                    );
                    res.redirect('back');
                } else {
                    // 이미 좋아요 했는지 확인
                    for (let i = 0; i < user.liked_comments.length; i++) {
                        if (user.liked_comments[i].equals(comment._id)) {
                            req.flash(
                                'error',
                                'You already liked this comment.'
                            );
                            return res.redirect('back');
                        }
                    }

                    comment.likes = comment.likes + 1;
                    comment.save();

                    user.liked_comments.push(comment._id);
                    user.save();

                    req.flash(
                        'success',
                        `You successfully liked ${comment.creator.firstName}'s comment.`
                    );
                    res.redirect('back');
                }
            });
        }
    });
});

// 새 포스트 작성
// GET
router.get('/post/new', isLoggedIn, (req, res) => {
    res.render('posts/new');
});
// POST
router.post('/post/new', isLoggedIn, upload.single('image'), (req, res) => {
    if (req.body.content) {
        let newPost = {};
        if (req.file) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                newPost.image = result.secure_url;
                newPost.creator = req.user;
                newPost.time = new Date();
                newPost.likes = 0;
                newPost.content = sanitize(req.body.content);
                return createPost(newPost, req, res);
            });
        } else {
            newPost.image = null;
            newPost.creator = req.user;
            newPost.time = new Date();
            newPost.likes = 0;
            newPost.content = sanitize(req.body.content);
            return createPost(newPost, req, res);
        }
    }
});

function createPost(newPost, req, res) {
    Post.create(newPost, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            req.user.posts.push(post._id);
            req.user.save();
            res.redirect('/');
        }
    });
}

// 포스트 조회
router.get('/post/:id', isLoggedIn, (req, res) => {
    Post.findById(req.params.id)
        .populate('comments')
        .exec((err, post) => {
            if (err) {
                console.log(err);
                req.flash(
                    'error',
                    'There has been an error finding this post.'
                );
                res.redirect('back');
            } else {
                res.render('posts/show', { post: post });
            }
        });
});

// 새 댓글 등록
router.post('/post/:id/comments/new', isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
            req.flash('error', 'There has been an error posting your comment.');
            res.redirect('back');
        } else {
            Comment.create({ content: req.body.content }, (err, comment) => {
                if (err) {
                    console.log(err);
                    req.flash(
                        'error',
                        'Something went wrong with posting your comment.'
                    );
                    res.redirect('back');
                } else {
                    comment.creator._id = req.user._id;
                    comment.creator.firstName = req.user.firstName;
                    comment.creator.lastName = req.user.lastName;
                    comment.likes = 0;
                    comment.save();

                    post.comments.push(comment);
                    post.save();

                    req.flash('success', 'Successfully posted your comment.');
                    res.redirect('/post/' + post._id);
                }
            });
        }
    });
});

module.exports = router;