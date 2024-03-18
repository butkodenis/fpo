const createContract = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    return res.status(200).json({ message: 'Контракт створено успішно' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createContract };
