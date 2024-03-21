import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormContract from '../forms/FormContract';

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

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
                  {student.lastName} {student.firstName} {student.middleName}
                </mark>
              </p>
              <p className="card-text">тел.: {student.phone}</p>
              <p className="card-text">Курси :</p>
              <hr />
              {contracts.map((contract, index) => (
                <FormContract key={index} contract={contract} />
              ))}

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
