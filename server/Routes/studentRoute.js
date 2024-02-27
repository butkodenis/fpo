const router = require('express').Router();
const studentController = require('../Controllers/studentController');

router.post('/student/create', studentController.createStudent);

module.exports = router;
