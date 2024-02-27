const router = require('express').Router();
const courseController = require('../Controllers/courseController');

router.get('/course/getAll', courseController.getAllCourses);

module.exports = router;
