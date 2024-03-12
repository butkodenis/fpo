import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const StudentAddCourse = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getAll`);
      setCourses(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    /*
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/addCourse`, data);
    } catch (error) {
      console.error(error);
    }
    */
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <h3>Додати курс</h3>
          <p>курс : {id}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="course">Курс</label>
            <select className="form-control" id="course" {...register('course')}>
              <option>Виберіть курс</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.typeCourse} {course.specialty} {course.price}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="startDate">Дата початку</label>
            <input type="date" className="form-control" id="startDate" {...register('startDate')} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endDate">Дата закінчення</label>
            <input type="date" className="form-control" id="endDate" {...register('endDate')} />
          </div>
          <button type="submit" className="btn btn-primary">
            Додати
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentAddCourse;
