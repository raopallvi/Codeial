const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/profile' , usersController.profile);
router.get('/post' , usersController.post);
router.get('/signUp' , usersController.signUp);
router.get('/signIn' , usersController.signIn);
router.post('/create' , usersController.create);
router.post('/create-session' , usersController.createSession);
router.get('/signOut' , usersController.signOut);
module.exports = router;

