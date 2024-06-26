const Course = require('../Model/courseModel');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { typeCourse, specialty, duration, price, order, orderDate } = req.body;

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
      orderDate,
    });
    await newCourse.save();

    res.status(201).json({ message: 'Курс додано' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { typeCourse, specialty, duration, price, order, orderDate } = req.body;

    const existingCourse = await Course.findOne({ _id: id });

    if (!existingCourse) {
      return res.status(400).json({ message: 'Курс не знайдено' });
    }
    await Course.findByIdAndUpdate(id, {
      typeCourse,
      specialty,
      duration,
      price,
      order,
      orderDate,
    });
    res.status(200).json({ message: 'Курс оновлено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCourse = await Course.findOne({ _id: id });

    if (!existingCourse) {
      return res.status(400).json({ message: 'Курс не знайдено' });
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: 'Курс видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse };
