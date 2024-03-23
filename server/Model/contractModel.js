const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  num: { type: Number },
  numDate: { type: Date },
  urFullName: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  part: { type: Number },
  payDate: { type: Date },
  numOrder: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contract', contractSchema);
