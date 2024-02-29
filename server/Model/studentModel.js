const mongoose = require('mongoose');

const cardStudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },

  info: {
    age: { type: Number },
    passport_id: { type: String },
    address: {
      city: { type: String },
      street: { type: String },
      house: { type: String },
      flat: { type: String },
    },
    phone: { type: String },
    email: { type: String },
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      activ: { type: Boolean, default: false },
      startCourse: { type: Date },
      endCourse: { type: Date },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CardStudent', cardStudentSchema);
