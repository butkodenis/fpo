const CardStudent = require('../Model/studentModel');

const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, middleName } = req.body;
    console.log(` ${firstName} _ ${lastName} _ ${middleName}`);

    // перевірка чи студент вже існує
    const existingStudent = await CardStudent.findOne({ firstName, lastName, middleName });

    if (existingStudent) {
      return res.status(400).json({ message: 'Студент вже існує' });
    }

    const student = await new CardStudent({ firstName, lastName, middleName }).save();
    return res.status(201).json({ message: `Студента створено успішно : ${student.id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createStudent };
