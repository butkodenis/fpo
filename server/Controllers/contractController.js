const Contract = require('../Model/contractModel');

const createContract = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { courseId, startDate, endDate, urFullName, part, payDate, num, numDate } = req.body;
    const contract = new Contract({
      student: id,
      course: courseId,
      startDate,
      endDate,
      urFullName,
      part,
      payDate,
      num,
      numDate,
    });
    await contract.save();
    return res.status(200).json({ message: 'Контракт створено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createContract };
