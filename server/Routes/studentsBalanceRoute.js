const router = require('express').Router();
const studentBalanceController = require('../Controllers/studentBalanceController');

router.get('/balance/getAll', studentBalanceController.getAllStudentsBalance);
router.post('/balance/closeMonth', studentBalanceController.closeMonth);
router.post('/balance/closeMonthStart', studentBalanceController.closeMonthStart);

module.exports = router;
