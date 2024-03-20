import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormContract = ({ contract }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],
    },
  });
  return (
    <div className="mb-3">
      <form>
        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="startDate">Дата початку</label>
            <input type="date" className="form-control" id="startDate" {...register('startDate')} />
          </div>
          <div className="form-group col-6">
            <label htmlFor="endDate">Дата закінчення</label>
            <input type="date" className="form-control" id="endDate" {...register('endDate')} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default FormContract;
