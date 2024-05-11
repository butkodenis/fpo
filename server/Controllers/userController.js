const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../Model/userModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email }); // ищем пользователя в базе данных

    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' }); // если пользователь существует, возвращаем ошибку
    }

    const hashedPassword = await bcrypt.hash(password, 10); // хешируем пароль
    const newUser = new User({ name, email, password: hashedPassword }); // создаем нового пользователя
    await newUser.save();

    return res.status(201).json({ message: 'Користувача створено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // получаем email и пароль из запроса

    if (!email || !password) {
      return res.status(400).json({ message: 'Введіть email та пароль' }); // если email или пароль не введены, возвращаем ошибку
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // если пользователя с таким email не существует, возвращаем ошибку
      return res.status(400).json({ message: 'Користувача з таким email не знайдено.' });
    }
    // сравниваем пароль из запроса с паролем из базы данных
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Неправильний пароль' });
    }

    // создаем токен для пользователя
    const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    // устанавливаем токен в куки
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

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserInfo, getUsers };
