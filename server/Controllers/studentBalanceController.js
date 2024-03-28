const StudentsBalance = require('../Model/studentsBalanceModel');

const getAllStudentsBalance = async (req, res) => {
  try {
    const studentsBalance = await StudentsBalance.find().populate('student');
    // console.log(studentsBalance);
    res.status(200).json(studentsBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const closeMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    const studentsBalance = await StudentsBalance.find({
      year,
      month,
      balanceEnd: { $ne: 0 },
    }).populate('student');
    // console.log(studentsBalance);

    const studentsBalanceNextMonth = studentsBalance.map((studentBalance) => {
      const { student, balanceEnd } = studentBalance;
      return {
        student,
        balanceStart: balanceEnd,
        balanceEnd: 0,
        accrued: 0,
        payment: 0,
        year: nextYear,
        month: nextMonth,
      };
    });

    // console.log(studentsBalanceNextMonth);

    await StudentsBalance.insertMany(studentsBalanceNextMonth);

    res.status(200).json({ message: 'Місяць закрито' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllStudentsBalance, closeMonth };
