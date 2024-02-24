const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const verifyToken = require('../Middleware/AuthMiddleware');

router.post('/user/register', userController.registerUser);

router.post('/user/login', userController.loginUser);

router.get('/user/logout', userController.logoutUser);

router.get('/user/info', verifyToken, userController.getUserInfo);

module.exports = router;
