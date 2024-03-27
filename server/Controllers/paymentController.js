const Payment = require('../Model/paymentModel');

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentPayments = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.find({ student: id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { payDate, amount, numberPayment, period } = req.body;
    const newPayment = new Payment({
      student: id,
      payDate,
      amount,
      numberPayment,
      period,
    });
    await newPayment.save();

    res.status(201).json({ message: 'Платіж додано' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPayments, getStudentPayments, createPayment };
