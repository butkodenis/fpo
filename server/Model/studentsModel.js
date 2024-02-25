const mongoose = require('mongoose');

const cardStudentsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  passport: {
    id: { String, required: true },
  },
  address: {
    city: { String, required: true },
    street: { String, required: true },
    house: { String, required: true },
    flat: { String, required: true },
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: [
    {
      courseName: { type: String, required: true },
      courseStartDate: { type: Date, required: true },
      courseEndDate: { type: Date, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CardStudents', cardStudentsSchema);
