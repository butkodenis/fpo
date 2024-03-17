import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const StudentAddContract = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getAll`);
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="d-flex ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="course">Курс</label>
            <select className="form-control" id="course" {...register('courseId')}>
              <option>Виберіть курс</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.typeCourse} {course.specialty} {course.price}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="form-group col-6 mb-3">
              <label htmlFor="startDate">Дата початку</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                {...register('startDate')}
              />
            </div>

            <div className="form-group col-6 mb-3 ">
              <label htmlFor="endDate">Дата закінчення</label>
              <input type="date" className="form-control" id="endDate" {...register('endDate')} />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="chair">Замовник</label>
            <input
              type="text"
              className="form-control"
              id="urFullName"
              {...register('urFullName')}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="ur">Юридична особа</label>
            <select className="form-control" id="ur" {...register('ur')}>
              <option value="">введите юр.особу</option>
              <option value="1">Виберіть курс</option>
              <option value="2">Виберіть курс</option>
              <option value="3">Виберіть курс</option>
            </select>
          </div>
          <div className="row">
            <div className="form-group col-6 mb-3">
              <label htmlFor="num">Номер договору</label>
              <input type="text" className="form-control" id="num" {...register('num')} />
            </div>
            <div className="form-group col-6 mb-3 ">
              <label htmlFor="numDate">Від</label>
              <input type="date" className="form-control" id="numDate" {...register('numDate')} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary ">
            Додати
          </button>
          <Link to="/students" className="btn btn-primary ">
            Повернутися
          </Link>
        </form>
      </div>
    </>
  );
};

export default StudentAddContract;
