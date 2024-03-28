const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  payDate: { type: Date },
  amount: { type: Number },
  numberPayment: { type: Number },
  period: { type: Date },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() + 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
