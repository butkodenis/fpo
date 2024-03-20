import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormContract = ({ contract }) => {
  const [activeForm, setActiveForm] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setActiveForm(false); // После отправки формы устанавливаем activeForm в false
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-4">
            <label htmlFor="num">№ договору</label>
            <input
              type="number"
              className="form-control"
              id="num"
              defaultValue={contract.num}
              disabled
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="numDate">Дата укладення</label>
            <input
              type="date"
              className="form-control"
              id="numDate"
              defaultValue={contract.numDate.split('T')[0]}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="startDate">Дата початку</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              {...register('startDate')}
              disabled={!activeForm}
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="endDate">Дата закінчення</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              {...register('endDate')}
              disabled={!activeForm}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setActiveForm(true)} // Устанавливаем activeForm в true при нажатии на кнопку изменения
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        {activeForm && (
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-floppy"></i>
          </button>
        )}
      </form>
    </div>
  );
};

export default FormContract;
