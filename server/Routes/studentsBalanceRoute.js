const router = require('express').Router();
const studentBalanceController = require('../Controllers/studentBalanceController');

router.get('/balance/getAll', studentBalanceController.getAllStudentsBalance);

module.exports = router;
