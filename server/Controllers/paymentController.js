const Payment = require('../Model/paymentModel');
const StudentsBalance = require('../Model/studentsBalanceModel');

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('student');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentPayments = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.find({ student: id }).populate('student');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { payDate, amount, numberPayment, urFullName, edrpou } = req.body;

    console.log(req.body);

    const newPayment = new Payment({
      student: id,
      amount,
      payDate,
      numberPayment,
      urFullName,
      edrpou,
    });
    await newPayment.save();

    // оновлюємо баланс студента
    const studentBalance = await StudentsBalance.findOne({
      student: id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

    if (!studentBalance) {
      res.status(404).json({ message: 'Баланс студента не знайдено' });
    }
    console.log(studentBalance);

    studentBalance.payment += amount;
    studentBalance.balanceEnd =
      studentBalance.balanceStart + studentBalance.accrued + studentBalance.payment;

    await studentBalance.save();

    res.status(201).json({ message: 'Платіж додано' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPayments, getStudentPayments, createPayment };
