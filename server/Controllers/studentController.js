const CardStudent = require('../Model/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await CardStudent.find();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await CardStudent.findOne({ _id: id });
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
    const { firstName, lastName, middleName, info, course } = req.body;

    // перевірка чи студент вже існує
    const existingStudent = await CardStudent.findOne({ firstName, lastName, middleName });

    if (existingStudent) {
      return res.status(400).json({ message: 'Студент вже існує' });
    }

    const student = new CardStudent({ firstName, lastName, middleName, info, course });
    await student.save();
    return res.status(201).json({ message: `Студента створено успішно : ${student.id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, middleName } = req.body;

    const existingStudent = await CardStudent.findOne({});
    if (!existingStudent) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    await CardStudent.findByIdAndUpdate(id, { firstName, lastName, middleName });
    return res.status(200).json({ message: 'Студента оновлено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await CardStudent.findByIdAndDelete(id);
    if (!student) {
      return res.status(400).json({ message: 'Студента не знайдено' });
    }
    return res.status(200).json({ message: 'Студента видалено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent };
