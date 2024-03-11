import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/get`);
      console.log('Student data:', response.data); // Добавлено для отладки
      setStudent(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error(error); // Добавлено для отладки
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="d-flex ">
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <p className="card-text">
                <mark>
                  {student.firstName} {student.lastName} {student.middleName}
                </mark>
              </p>
              <p className="card-text">тел.: {student.phone}</p>
              <p className="card-text">Заклад: </p>
              <p className="card-text">Курси :</p>
              <hr />
              <div className="d-flex flex-column ">
                {student.courses.map((courseItem) => (
                  <div key={courseItem._id} className="">
                    <p className="card-text">Тип курсу : {courseItem.course.typeCourse}</p>
                    <p className="card-text">Назва курсу : {courseItem.course.specialty} </p>
                    <p className="card-text">Віртість : {courseItem.course.price} </p>
                    <p className="card-text">Тривалість : {courseItem.course.duration} годин</p>
                    <p className="card-text ">
                      з - {new Date(courseItem.startDate).toISOString().split('T')[0]} по :{' '}
                      {new Date(courseItem.endDate).toISOString().split('T')[0]}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>

              <Link to="/students" className="btn btn-primary">
                Повернутися
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
