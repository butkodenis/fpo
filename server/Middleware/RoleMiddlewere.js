const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
require('dotenv').config();

const verifyRole = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decrypt = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decrypt.id);

    const existingUser = await User.findById(decrypt.id);

    if (existingUser.role !== 'admin') {
      return res.status(403).json({ message: 'У вас немає прав доступу' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verifyRole;
