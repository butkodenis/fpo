const router = require('express').Router();
const userController = require('../Controllers/userController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddlewere');

router.post('/user/register', verifyToken, verifyRole, userController.registerUser);

router.post('/auth/login', userController.loginUser);

router.get('/auth/logout', userController.logoutUser);

router.get('/user/info', verifyToken, userController.getUserInfo);

router.get('/user/getAll', verifyToken, userController.getUsers);

module.exports = router;
