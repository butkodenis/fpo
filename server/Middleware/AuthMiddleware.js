const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(401).json({ message: 'Ви не увійшли в систему' });
  }

  try {
    const decrypt = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decrypt;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Помилка сервера' });
  }
};

module.exports = verifyToken;
