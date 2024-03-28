const mongoose = require('mongoose');

const studentsBalanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },
  accrued: { type: Number, default: 0 },
  balanceStart: { type: Number },
  balanceEnd: { type: Number },
  payment: { type: Number, default: 0 },
  year: { type: Number },
  month: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudentsBalance', studentsBalanceSchema);
