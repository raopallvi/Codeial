// The main Passport module.
const passport = require('passport');
// A strategy provided by Passport for authenticating using a username and password combination.
const LocalStrategy = require('passport-local').Strategy;
// requiring user model (or schema)
const User = require('../models/user');

// authentication using passport
// creating an instance of LocalStrategy
passport.use(new LocalStrategy(
    {
        // this is main authentication field which is our email
        usernameField: 'Email',
    },
    // this is a callback function
    // done is a function according to result (sucess or error)
    // when user tries to authentication then this function executes with required field for authentication
    function (Email, password, done) {
        // done is callback function which is reporting to passport js
        // find user and establish identity
        User.findOne({ Email: Email })
            .then((user) => {
                console.log(user);
                if (!user || user.Password != password) {
                    console.log("Invalid User Name and Password !");
                    // null means no error and false means authentication not done
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                console.log("Error in finding user : ", err);
                return done(err);
            })
    }
));

// Serializing and deserializing 
// putting user_id in cookie is serializing  and then using that user_id in 
// server side to find user in database this process is called deserialzing

// Serializing the user to decide which key is stored in cookie
// In the serialization step, Passport determines what user data should be stored in the session:

// The passport.serializeUser function is called to specify how the user object should be serialized.
// In this case, it serializes the user by storing the user's _id property in the session.
// user_id is stored in session cookie and it is encrypted , encryption is not done by passport
// encryption is done by an express library which is express session
passport.serializeUser(function (user, done) {
    //this function encrypt user id using express session.
    done(null, user.id);
});
// now user is able to store their identity and that identity is stored in cookie session using express session.
// In the deserialization step, Passport retrieves the user object from the session based on the stored information:

// The passport.deserializeUser function is called to specify how to retrieve a user object from the serialized data.
// In this case, it retrieves the user object by finding it in the database based on the stored _id.
// deserializing the user from key in cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log("Error in finding user : ", err);
            return done(err);
        })
});


// check authentication
passport.checkAuthentication = function (req, res, next) {
    // if user is authnticated then we will send req to next function
    // passport put a method on  request isAuthenticated()
    if (req.isAuthenticated()) {
        // if user is signed in
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/signIn');
}

// set authenticated user for views
// this is a middleware function
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains current authnticated user from cookies and we are just sending it to locals
        res.locals.user = req.user;
    }
    next();
}
// exports so that we can use it in other parts to our application
module.exports = passport;