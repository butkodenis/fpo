const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || ''; // получаем токен из куки

  if (!token) {
    return res.status(401).json({ message: 'Ви не увійшли в систему' }); // Unauthorized
  }

  try {
    const decrypt = jwt.verify(token, process.env.TOKEN_KEY, { algorithms: ['HS256'] });
    req.user = decrypt;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен устарів' }); // Unauthorized
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Недійсний токен' }); // Unauthorized
    }
    return res.status(500).json({ message: 'Помилка сервера' }); // Internal Server Error
  }
};

module.exports = verifyToken;
