const router = require('express').Router();
const courseController = require('../Controllers/courseController');

router.get('/course/getAll', courseController.getAllCourses);
router.get('/course/:id/get', courseController.getCourse);
router.post('/course/create', courseController.createCourse);
router.put('/course/:id/update', courseController.updateCourse);
router.delete('/course/:id/delete', courseController.deleteCourse);
module.exports = router;
