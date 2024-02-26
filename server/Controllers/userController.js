const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../Model/userModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Користувача створено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Введіть email та пароль' });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'Користувача з таким email не знайдено.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Неправильний пароль' });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

    res.cookie('token', token, { withCredentials: true, httpOnly: false });
    return res.status(200).json({ message: 'Ви увійшли в систему успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Ви вийшли з системи' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    res.status(200).json({ message: 'Успішна аутентифікація користувача' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserInfo };
