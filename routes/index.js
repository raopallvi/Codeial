const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');
router.get('/' , homeController.home);
router.get('/users' , userController.users);
router.use('/users' , require('./users'));
module.exports = router;

