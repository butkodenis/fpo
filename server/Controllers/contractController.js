const Contract = require('../Model/contractModel');
const StudentsBalance = require('../Model/studentsBalanceModel');

const createContract = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { courseId, startDate, endDate, urFullName, part, payDate, num, numDate, numOrder } =
      req.body;
    const contract = new Contract({
      student: id,
      course: courseId,
      startDate,
      endDate,
      urFullName,
      part,
      payDate,
      numOrder,
      num,
      numDate,
    });
    await contract.save();

    const currentDate = new Date();
    const period = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

    const studentBalance = new StudentsBalance({
      student: id,
      balanceStart: 0,
      balanceEnd: 0,
      period: period,
    });

    await studentBalance.save();

    return res.status(200).json({ message: 'Контракт створено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, part, payDate, price, numOrder } = req.body;
    console.log(req.body);
    const contract = {
      startDate,
      endDate,
      part,
      payDate,
      price,
      numOrder,
    };
    await Contract.findByIdAndUpdate(id, contract);

    return res.status(200).json({ message: 'Контракт оновлено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const existsContract = await Contract.findById(id);

    if (!existsContract) {
      return res.status(400).json({ message: 'Контракт не знайдено' });
    }

    await Contract.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Контракт видалено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createContract, deleteContract, updateContract };
