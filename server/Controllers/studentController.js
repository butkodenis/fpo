const Student = require('../Model/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate('courses.course');
    if (!student) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, middleName, phone, ur } = req.body;

    // перевірка чи студент вже існує
    const existingStudent = await Student.findOne({ firstName, lastName, middleName });

    if (existingStudent) {
      return res.status(400).json({ message: 'Студент вже існує' });
    }

    const student = new Student({ firstName, lastName, middleName, phone, ur });
    await student.save();
    return res.status(201).json({ message: `Студента створено успішно` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCourseToStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId, startDate, endDate, chair, status } = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    student.courses.push({ course: courseId, startDate, endDate, chair, status });
    await student.save();
    return res.status(200).json({ message: 'Курс додано до студента успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, middleName } = req.body;

    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    await Student.findByIdAndUpdate(id, { firstName, lastName, middleName });
    return res.status(200).json({ message: 'Студента оновлено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    return res.status(200).json({ message: 'Студента видалено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  addCourseToStudent,
  updateStudent,
  deleteStudent,
};
