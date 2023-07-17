const mongoose = require("mongoose");
const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('userProfile');
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

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}