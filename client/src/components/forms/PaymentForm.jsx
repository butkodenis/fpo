import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

const PaymentForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
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
