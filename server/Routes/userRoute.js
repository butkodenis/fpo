const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/user/register', userController.registerUser);

router.post('/user/login', (req, res) => {
  const { email, password } = req.body;

  res.json({ message: 'User login' });
});

router.get('/user/info', (req, res) => {
  // Handle GET request for /user
  res.json({ message: 'User Info' });
});

module.exports = router;
