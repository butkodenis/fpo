const Contract = require('../Model/contractModel');
const StudentsBalance = require('../Model/studentsBalanceModel');
const Course = require('../Model/courseModel');
const splitPayment = require('../util/splitPayment');

const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createContract = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const {
      courseId,
      startDate,
      endDate,
      urFullName,
      edrpou,
      part,
      payDate,
      num,
      numDate,
      numOrder,
    } = req.body;

    const contract = new Contract({
      student: id,
      course: courseId,
      startDate,
      endDate,
      urFullName,
      edrpou,
      part,
      payDate,
      numOrder,
      num,
      numDate,
    });
    const saveContract = await contract.save();

    // Создаем строку баланса для студента на текущий месяц

    const { price } = await Course.findById(courseId);

    if (!price) {
      return res.status(400).json({ message: 'Ціна курсу не знайдена' });
    }

    if (!saveContract) {
      return res.status(400).json({ message: 'Контракт не збережено' });
    }

    if (part === 1) {
      const studentBalance = new StudentsBalance({
        student: id,
        contract: saveContract.id,
        balanceStart: 0,
        accrued: -price,
        balanceEnd: -price,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      });

      await studentBalance.save();

      return res.status(200).json({ message: 'Контракт створено успішно' });
    }

    // Если платеж дробный, то разбиваем его на части

    let payParts = splitPayment(price, part);
    console.log(payParts);
    const currentPay = payParts.shift();

    const studentBalance = new StudentsBalance({
      student: id,
      contract: saveContract.id,
      balanceStart: 0,
      accrued: -currentPay,
      accruedPlan: payParts,
      balanceEnd: -price / part,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
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
    console.log(req.body); /*   */
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

    // Удаление всех строк баланса с данным идентификатором контракта
    await StudentsBalance.deleteMany({ contract: id });

    // Затем удаляем сам контракт
    await Contract.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Контракт видалено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getContracts, createContract, deleteContract, updateContract };
