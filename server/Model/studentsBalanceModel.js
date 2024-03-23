const mongoose = require('mongoose');

const studentsBalanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  accrued: { type: Number, default: 0 },
  balanceStart: { type: Number },
  balanceEnd: { type: Number },
  payment: { type: Number, default: 0 },
  period: { type: Date },
});

module.exports = mongoose.model('StudentsBalance', studentsBalanceSchema);
