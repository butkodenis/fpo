import { useState } from 'react';
import { useForm } from 'react-hook-form';

const StudentAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <div className="container">
        <h3>Додати студента</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="lastName">Призвище</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              {...register('lastName', { required: true, minLength: 2, maxLength: 20 })}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <span className="text-danger">Це поле є обов'язковим</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="firstName">Ім'я </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && errors.firstName.type === 'required' && (
              <span className="text-danger">Це поле є обов'язковим</span>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="middleName">По-батькові</label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              {...register('middleName', { required: true })}
            />
            {errors.middleName && errors.middleName.type === 'required' && (
              <span className="text-danger">Це поле є обов'язковим</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Телефон</label>
            <input type="text" className="form-control" id="phone" {...register('phone')} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="ur">Юр. особа</label>
            <input type="text" className="form-control" id="ur" {...register('ur')} />
          </div>
          <button type="submit" className="btn btn-primary">
            Додати
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentAdd;
