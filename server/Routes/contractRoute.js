const router = require('express').Router();
const contractController = require('../Controllers/contractController');

router.post('/student/:id/addContract', contractController.createContract);

module.exports = router;
