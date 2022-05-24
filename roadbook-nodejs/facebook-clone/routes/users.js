// 사용자 관련 router
const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const multer = require('multer'); // urlencoded는 txt 처리, multer는 img, video 등 file 처리
const cloudinary = require('cloudinary'); // 파일 저장을 위한 SaaS 서비스
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// multer.body : save txt data
// multer.file : save multipart data

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

// storage: 저장 위치 지정, fileFilter: 어떤 파일을 허용할지 제어
const upload = multer({ storage: storage, fileFilter: imageFilter });

// cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middleware : 로그인하지 않은 사용자 체크. 로그인 필요한 동작에 사용
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/user/login');
};

// Routers
// User Routers
// Register
router.post('/user/register', upload.single('image'), (req, res) => {
    if (
        req.body.username &&
        req.body.firstname &&
        req.body.lastname &&
        req.body.password
    ) {
        let newUser = new User({
            username: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
        });
        // 프로필 이미지
        if (req.file) {
            // upload image file to cloudinary
            cloudinary.uploader.upload(req.file.path, (result) => {
                newUser.profile = result.secure_url;
                return createUser(newUser, req.body.password, req, res);
            });
        } else {
            newUser.profile = process.env.DEFAULT_PROFILE_PIC;
            return createUser(newUser, req.body.password, req, res);
        }
    }
});

function createUser(newUser, password, req, res) {
    User.register(newUser, password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            passport.authenticate('local')(req, res, function () {
                console.log(req.user);
                req.flash(
                    'success',
                    'Success! You are registerd and logged in!'
                );
                res.redirect('/');
            });
        }
    });
}

// Login
// GET - render ejs file
router.get('/user/login', csrfProtection, (req, res) => {
    res.render('users/login', { csrfToken: req.csrfToken() });
});
// POST - passport authentication
router.post(
    '/user/login',
    csrfProtection,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
    }),
    (req, res) => {}
);

// All users
router.get('/user/all', isLoggedIn, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            req.flash(
                'error',
                'There has been a problem getting all users info.'
            );
            res.redirect('/');
        } else {
            res.render('users/users', { users: users });
        }
    });
});

// Logout
router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('back');
});

// Create user profile
router.get('/user/:id/profile', isLoggedIn, (req, res) => {
    // populate() : Document가 다른 Document의 ObjectID를 사용하는 경우 (== FK일 때)
    //              실제 객체가 어떤 것인지 찾아서 바꿔주는 역할
    // exec() : 결과 콜백에 넘겨줌
    User.findById(req.params.id)
        .populate('friends')
        .populate('friendRequests')
        .populate('posts')
        .exec((err, user) => {
            if (err) {
                console.log(err);
                req.flash('error', 'There has been an error.');
                res.redirect('back');
            } else {
                console.log(user);
                res.render('users/user', { userData: user });
            }
        });
});

// Add Friend
router.get('/user/:id/add', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            req.flash(
                'error',
                'There has been an error adding this person to your friend list.'
            );
            res.redirect('back');
        } else {
            User.findById(req.params.id, (err, foundUser) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Person not found');
                    res.redirect('back');
                } else {
                    if (
                        foundUser.friendRequests.find((o) =>
                            o._id.equals(user._id)
                        )
                    ) {
                        req.flash(
                            'error',
                            `You have already sent a friend request to ${user.firstName}`
                        );
                        return res.redirect('back');
                    } else if (
                        foundUser.friends.find((o) => o._id.equals(user._id))
                    ) {
                        req.flash(
                            'error',
                            `The user ${foundUser.firstname} is already in your friends list`
                        );
                        return res.redirect('back');
                    }

                    // 친구 추가
                    let currUser = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    };
                    foundUser.friendRequests.push(currUser);
                    foundUser.save();

                    req.flash(
                        'success',
                        `Success! You sent ${foundUser.firstName} a friend request!`
                    );
                    res.redirect('back');
                }
            });
        }
    });
});

// Accept friend request
router.get('/user/:id/accept', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            req.flash(
                'error',
                'There has been an error finding your profile, are you connected?'
            );
            res.redirect('back');
        } else {
            User.findById(req.params.id, (err, foundUser) => {
                let r = user.friendRequests.find((o) =>
                    o._id.equals(req.params.id)
                );

                if (r) {
                    let index = user.friendRequests.indexOf(r);
                    user.friendRequests.splice(index, 1);
                    let friend = {
                        _id: foundUser._id,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                    };
                    user.friends.push(friend);
                    user.save();

                    let currUser = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    };
                    foundUser.friends.push(currUser);
                    foundUser.save();

                    req.flash(
                        'success',
                        `You and ${foundUser.firstName} are now friends!`
                    );
                    res.redirect('back');
                } else {
                    req.flash(
                        'error',
                        'There has been an error, is the profile you are trying to add on your requests?'
                    );
                    res.redirect('back');
                }
            });
        }
    });
});

// Decline friend request
router.get('/user/:id/decline', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            req.flash(
                'error',
                'There has been an error declining the request.'
            );
            res.redirect('back');
        } else {
            User.findById(req.params.id, (err, foundUser) => {
                if (err) {
                    console.log(err);
                    req.flash(
                        'error',
                        'There has been an error declining the request.'
                    );
                    res.redirect('back');
                } else {
                    // remove request
                    let r = user.friendRequests.find((o) =>
                        o._id.equals(foundUser._id)
                    );

                    if (r) {
                        let index = user.friendRequests.indexOf(r);
                        user.friendRequests.splice(index, 1);
                        user.save();
                        req.flash('success', 'You declined.');
                        res.redirect('back');
                    }
                }
            });
        }
    });
});

// Chat Router
router.get('/chat', isLoggedIn, (req, res) => {
    User.findById(req.user._id)
        .populate('friends')
        .exec((err, user) => {
            if (err) {
                console.log(err);
                req.flash(
                    'error',
                    'There has been an error trying to access the chat.'
                );
                res.redirect('/');
            } else {
                res.render('users/chat', { userData: user });
            }
        });
});

module.exports = router;
