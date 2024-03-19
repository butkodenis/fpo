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
  const [activeFormIndex, setActiveFormIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/get`);

      setStudent(response.data.student);
      setContracts(response.data.contracts);
      setLoading(false);
      console.log(response.data); // Добавлено для отладки

      // Устанавливаем значения по умолчанию для каждого контракта
      response.data.contracts.forEach((contract, index) => {
        setValue(`startDate[${index}]`, contract.startDate.split('T')[0]);
        setValue(`endDate[${index}]`, contract.endDate.split('T')[0]);
        setValue(`urFullName[${index}]`, contract.urFullName);
      });
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error(error); // Добавлено для отладки
    }
  };

  const onSubmit = async (data) => {
    console.log(data); // Добавлено для отладки
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
      <div className="row">
        {contracts.map((contract, index) => (
          <form key={index} onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-6 mb-3">
                <label htmlFor={`startDate[${index}]`}>Дата початку</label>
                <input
                  type="date"
                  className="form-control"
                  id={`startDate[${index}]`}
                  disabled
                  {...register(`startDate[${index}]`)}
                />
              </div>
              <div className="form-group col-6 mb-3 ">
                <label htmlFor={`endDate[${index}]`}>Дата закінчення</label>
                <input
                  type="date"
                  className="form-control"
                  id={`endDate[${index}]`}
                  disabled
                  {...register(`endDate[${index}]`)}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor={`urFullName[${index}]`}>Юр. особа</label>
              <input
                type="text"
                className="form-control"
                id={`urFullName[${index}]`}
                disabled
                {...register(`urFullName[${index}]`)}
              />
            </div>
            <button type="button" className="btn btn-primary ">
              Редагувати
            </button>
            <button type="submit" className="btn btn-primary">
              Надіслати
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default StudentCard;
