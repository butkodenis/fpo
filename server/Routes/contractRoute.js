const router = require('express').Router();
const contractController = require('../Controllers/contractController');

router.post('/student/:id/addContract', contractController.createContract);
router.put('/student/contract/:id/update', contractController.updateContract);
router.delete('/student/contract/:id/delete', contractController.deleteContract);

module.exports = router;
