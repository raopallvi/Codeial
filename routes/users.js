const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile/:id' , passport.checkAuthentication ,usersController.profile);
router.get('/post' , usersController.post);
router.get('/signUp' , usersController.signUp);
router.get('/signIn' , usersController.signIn);
router.post('/create' , usersController.create);

// use passport middleware for authentication
// if authentication is done then createSession controller is called otherise failure redirect
router.post('/create-session' ,passport.authenticate('local' , {failureRedirect : '/users/signIn'}  ) ,  usersController.createSession);
router.post('/update/:id' , passport.checkAuthentication , usersController.updateProfile);
router.get('/signOut' , usersController.destroySession);
module.exports = router;
