const Course = require('../Model/courseModel');

const getAllCourses = async (req, res) => {
  try {
    // const courses = await Course.find();

    res.status(200).json({ message: 'All courses' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { typeCourse, specialty, duration, price, order } = req.body;

    const existingCourse = await Course.findOne({ typeCourse, specialty, duration, price, order });

    if (existingCourse) {
      return res.status(400).json({ message: 'Курс вже існує' });
    }

    const newCourse = new Course({
      typeCourse,
      specialty,
      duration,
      price,
      order,
    });
    await newCourse.save();
    res.status(201).json({ message: 'Курс додано' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCourses, createCourse };
