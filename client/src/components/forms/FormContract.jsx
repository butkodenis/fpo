import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormContract = ({ contract, fetchStudent }) => {
  const [activeForm, setActiveForm] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],

      payDate: contract.payDate.split('T')[0],
      part: contract.part,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/student/contract/${contract._id}/update`,
        data,
      );
      console.log(res.data);
      setActiveForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      fetchStudent();
    }
  };

  const deleteContract = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/student/contract/${contract._id}/delete`,
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setActiveForm(false);
      fetchStudent();
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-3">
            <label htmlFor="num">№ договору</label>
            <input
              type="number"
              className="form-control"
              id="num"
              defaultValue={contract.num}
              disabled
            />
          </div>
          <div className="form-group col-3">
            <label htmlFor="numDate">Дата укладення</label>
            <input
              type="date"
              className="form-control"
              id="numDate"
              defaultValue={contract.numDate.split('T')[0]}
              disabled
            />
          </div>
          {contract.urFullName && (
            <div className="form-group col-6">
              <label htmlFor="urFullName">Юр. особа</label>
              <input
                type="text"
                className="form-control"
                id="urFullName"
                defaultValue={contract.urFullName}
                disabled
              />
            </div>
          )}
        </div>
        <div className="row">
          <div className="form-group col-2">
            <label htmlFor="price">Сума</label>
            <input
              type="number"
              className="form-control"
              id="price"
              defaultValue={contract.course.price}
              disabled
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="payDate">Дата оплати</label>
            <input
              type="date"
              className="form-control"
              id="payDate"
              disabled={!activeForm}
              {...register('payDate')}
            />
          </div>

          <div className="form-group col-3">
            <label htmlFor="part">Оплата частинами</label>
            <input
              type="number"
              className="form-control"
              id="part"
              disabled={!activeForm}
              min={1}
              max={6}
              {...register('part')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-7">
            <label htmlFor="specialty">Курс</label>
            <input
              type="text"
              className="form-control"
              id="specialty"
              defaultValue={contract.course.specialty}
              disabled
            />
          </div>
          <div className="form-group col-3">
            <label htmlFor="typeCourse">Спеціалізація</label>
            <input
              type="text"
              className="form-control"
              id="typeCourse"
              defaultValue={contract.course.typeCourse}
              disabled
            />
          </div>
          <div className="form-group col-2">
            <label htmlFor="duration">Годин</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              defaultValue={contract.course.duration}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-3">
            <label htmlFor="startDate">Дата початку</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              {...register('startDate')}
              disabled={!activeForm}
            />
          </div>
          <div className="form-group col-3">
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
        <div className="row mt-3">
          <div className="col-1">
            <button type="button" className="btn btn-primary" onClick={() => setActiveForm(true)}>
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
          <div className="col-1">
            {activeForm && (
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-floppy"></i>
              </button>
            )}
          </div>
          <div className="col-1">
            {activeForm && (
              <button type="button" className="btn btn-danger" onClick={deleteContract}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
};

export default FormContract;
