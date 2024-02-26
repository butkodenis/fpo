const mongoose = require('mongoose');

const cardStudentsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  info: {
    age: { type: Number, required: true },
    passport_id: { type: String },
    address: {
      city: { String, required: true },
      street: { String, required: true },
      house: { String, required: true },
      flat: { String, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String },
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      activ: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CardStudents', cardStudentsSchema);
