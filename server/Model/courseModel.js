const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  typeCourse: { type: String, required: true },
  specialty: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  order: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
