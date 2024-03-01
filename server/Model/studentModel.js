const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  phone: { type: String },

  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
{
}
