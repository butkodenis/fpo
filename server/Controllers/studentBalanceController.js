const StudentsBalance = require('../Model/studentsBalanceModel');

const getAllStudentsBalance = async (req, res) => {
  try {
    const studentsBalance = await StudentsBalance.find().populate('student');
    console.log(studentsBalance);
    res.status(200).json(studentsBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllStudentsBalance };
