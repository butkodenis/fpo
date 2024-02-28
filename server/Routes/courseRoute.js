const router = require('express').Router();
const courseController = require('../Controllers/courseController');

router.get('/course/getAll', courseController.getAllCourses);
router.post('/course/create', courseController.createCourse);

module.exports = router;
