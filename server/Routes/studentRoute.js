const router = require('express').Router();
const studentController = require('../Controllers/studentController');

router.get('/student/getAll', studentController.getAllStudents);
router.get('/student/:id/get', studentController.getStudent);
router.post('/student/create', studentController.createStudent);
router.post('/student/:id/addCourse', studentController.addCourseToStudent);
router.put('/student/:id/update', studentController.updateStudent);
router.delete('/student/:id/delete', studentController.deleteStudent);

module.exports = router;
