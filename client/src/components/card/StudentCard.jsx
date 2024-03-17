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
