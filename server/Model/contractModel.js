const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  num: { type: Number },
  ur: { type: String },
  urFullName: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  chair: { type: String },
  status: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contract', contractSchema);
