import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/get`);

      setStudent(response.data.student);
      setContracts(response.data.contracts);
      setLoading(false);
      console.log(response.data); // Добавлено для отладки
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
              <p className="card-text">Курси :</p>
              <hr />
              <Link to="/students" className="btn btn-primary">
                Повернутися
              </Link>
            </>
          )}
        </div>
      </div>
      <form>
        <div className="row">
          <div className="form-group col-6 mb-3">
            <label htmlFor="startDate">Дата початку</label>
            <input type="date" className="form-control" id="startDate" disabled />
          </div>
          <div className="form-group col-6 mb-3 ">
            <label htmlFor="endDate">Дата закінчення</label>
            <input type="date" className="form-control" id="endDate" disabled />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="urFullName">Юр. особа</label>
          <input
            type="text"
            className="form-control"
            id="urFullName"
            disabled
            {...register('urFullName')}
          />
        </div>
        <button type="submit" className="btn btn-primary ">
          Змінити
        </button>
      </form>
    </div>
  );
};

export default StudentCard;
