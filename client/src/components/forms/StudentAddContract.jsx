import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const StudentAddContract = () => {
  const navigate = useNavigate();
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/student/${id}/addContract`,
        data,
      );
      console.log(res.data);
      setTimeout(() => {
        navigate('/students');
      }, 500);
    } catch (error) {
      console.error(error);
    }
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
            <div className="form-group col-4 mb-3">
              <label htmlFor="startDate">Дата початку</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                {...register('startDate')}
              />
            </div>

            <div className="form-group col-4 mb-3 ">
              <label htmlFor="endDate">Дата закінчення</label>
              <input type="date" className="form-control" id="endDate" {...register('endDate')} />
            </div>

            <div className="form-group col-4 mb-3">
              <label htmlFor="numOrder">№ наказу</label>
              <input
                type="number"
                className="form-control"
                id="numOrder"
                {...register('numOrder')}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-8 mb-3">
              <label htmlFor="urFullName">Юр. особа</label>
              <input
                type="text"
                className="form-control"
                id="urFullName"
                {...register('urFullName')}
              />
            </div>
            <div className="form-group col-4 mb-3">
              <label htmlFor="edrpou">ЄДРПОУ</label>
              <input type="text" className="form-control" id="edrpou" {...register('edrpou')} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-3 mb-3">
              <label htmlFor="num">Номер договору</label>
              <input type="text" className="form-control" id="num" {...register('num')} />
            </div>
            <div className="form-group col-3 mb-3 ">
              <label htmlFor="numDate">Від</label>
              <input type="date" className="form-control" id="numDate" {...register('numDate')} />
            </div>
            <div className="form-group col-3 mb-3">
              <label htmlFor="part">Частинами</label>
              <input
                type="number"
                className="form-control"
                id="sum"
                min="1"
                max="8"
                defaultValue="1"
                {...register('part')}
              />
            </div>

            <div className="form-group col-3 mb-3 ">
              <label htmlFor="payDate">Дата оплати</label>
              <input type="date" className="form-control" id="payDate" {...register('payDate')} />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-info ">
              Додати
            </button>
            <Link to="/students" className="btn btn-info ">
              Повернутися
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentAddContract;
