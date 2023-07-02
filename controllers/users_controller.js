const mongoose = require("mongoose");
const User = require('../models/user');
module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .then(user => {
                return res.render('userProfile', user);
            })
            .catch(err => {
                return res.redirect('/users/signIn');
            })
    }
    else
    {
        return res.redirect('/users/signIn');
    }
}

module.exports.post = function (req, res) {
    return res.end('<h1>User Post</h1>');
}

module.exports.users = function (req, res) {
    return res.render('userProfile.ejs', {
    });
}

module.exports.signUp = function (req, res) {
    return res.render('userSignUp.ejs');
}

module.exports.signIn = function (req, res) {
    return res.render('userSignIn.ejs');
}


module.exports.create = function (req, res) {
    if (req.body.Password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ Email: req.body.Email })
        .then(user => {
            console.log(req.body);
            if (!user) {
                User.create(req.body)
                    .then(newUser => {
                        return res.redirect('/users/signIn');
                    })
                    .catch(err => {
                        return console.log("Error in creating user : ", err);
                    })
            }
            else {
                return res.redirect('back');
            }
        })
        .catch(err => {
            if (err) {
                console.log("Error in finding User : ", err);
                return;
            }
        })
}

// Sign in and create session for user
module.exports.createSession = function (req, res) {
    // Find user
    User.findOne({ Email: req.body.Email })
        .then(user => {
            if (user) {
                // Handle user found
                if (user.Password != req.body.Password) {
                    // Handle mismatching of passwords which don't match
                    return res.redirect('back');
                }
                else {
                    // Handle session creation
                    res.cookie('user_id', user._id);
                    return res.render('userProfile', user);
                }
            }
            else {
                //Handle user not found
                return res.redirect('back');
            }
        })
        .catch(err => {
            return console.log("Error in finding user during sign in !", err);
        })
}

module.exports.signOut = function(req , res)
{
    res.cookie('user_id', null);
    return res.redirect('/users/signIn');
}