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

// закриття місяця
const closeMonth = async (req, res) => {
  try {
    const currentDate = new Date(); // узнаем текущую дату для поиска баланса по периоду
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const nextMonth = month === 12 ? 1 : month + 1; // если месяц декабрь, то следующий месяц январь следующего года
    const nextYear = month === 12 ? year + 1 : year; // если месяц декабрь, то год следующий

    // баланс студентов на текущий месяц с ненулевым балансом на конец месяца
    const studentsBalance = await StudentsBalance.find({
      year,
      month,
      balanceEnd: { $ne: 0 },
    }).populate('student');
    // console.log(studentsBalance);

    // создаем новый баланс для следующего месяца
    const studentsBalanceNextMonth = studentsBalance.map((studentBalance) => {
      const { student, contract, accruedPlan, balanceEnd } = studentBalance;
      const accrued = accruedPlan.length ? -accruedPlan.shift() : 0; // если массив accruedPlan не пустой, то берем первый элемент и удаляем его из массива

      return {
        student,
        contract,
        balanceStart: balanceEnd,
        accrued,
        accruedPlan,
        payment: 0,
        balanceEnd: balanceEnd + accrued,
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
