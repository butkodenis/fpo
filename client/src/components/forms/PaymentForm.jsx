import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PaymentForm = () => {
  const [urData, setUrData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchUr = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/contracts`);
      console.log(res.data);
      const resuilt = res.data
        .filter((obj) => obj.urFullName !== '')
        .map((obj) => ({
          urFullName: obj.urFullName,
          edrpou: obj.edrpou,
        }));
      console.log(resuilt);
      setUrData(resuilt);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUr();
  }, []);

  const onSubmit = async (data) => {
    // Преобразование значения amount в число
    data.amount = parseFloat(data.amount);
    // console.log(data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/${id}/create`,
        data,
      );
      console.log(res.data);
      navigate('/payment');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <form onSubmit={handleSubmit(onSubmit)} className="w-50">
            <h3>Додати платіж</h3>
            <div className="form-group mb-3">
              <label htmlFor="amount">Сумма</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                {...register('amount', { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="payDate">Дата</label>
              <input
                type="date"
                className="form-control"
                id="payDate"
                {...register('payDate', { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="numberPayment">номер платіж</label>
              <input
                type="text"
                className="form-control"
                id="numberPayment"
                {...register('numberPayment', { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="urFullName">П.І.Б. платника</label>
              <input
                type="text"
                className="form-control"
                id="urFullName"
                {...register('urFullName', { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="edrpou">ЄДРПОУ</label>
              <input
                type="text"
                className="form-control"
                id="edrpou"
                {...register('edrpou', { required: true })}
              />
            </div>

            <button type="submit" className="btn btn-info ">
              Додати
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
