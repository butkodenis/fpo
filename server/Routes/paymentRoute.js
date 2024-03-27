const router = require('express').Router();

const paymentController = require('../Controllers/paymentController');

router.get('/payment/getAll', paymentController.getPayments);
router.get('/payment/:id/get', paymentController.getStudentPayments);
router.post('/payment/:id/create', paymentController.createPayment);

module.exports = router;
