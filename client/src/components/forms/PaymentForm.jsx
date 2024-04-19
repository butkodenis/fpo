import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';

// Компонент PaymentForm

const PaymentForm = () => {
  const [urData, setUrData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUr();
  }, []);

  const fetchUr = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/contracts`);
      console.log(res.data);
      const result = res.data
        .filter((obj) => obj.urFullName !== '')
        .map((obj) => ({
          urFullName: obj.urFullName,
          edrpou: obj.edrpou,
        }));
      console.log(result);
      setUrData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    // Преобразование значения amount в число
    data.amount = parseFloat(data.amount);
    console.log(data);

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
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5">Додати платіж</Typography>
            </Grid>

            <Grid container item xs={6} sm={12} spacing={2}>
              <Grid item xs={6} sm={3}>
                <TextField label="Сума" {...register('amount', { required: true })} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Дата оплати"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  {...register('payDate', { required: true })}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Номер платежу"
                  {...register('numberPayment', { required: true })}
                />
              </Grid>
            </Grid>
            <Grid container item xs={6} sm={12} spacing={2}>
              <Grid item xs={4} sm={8}>
                <TextField
                  label="Юр. особа"
                  list="urFullNameOptions"
                  {...register('urFullName')}
                  fullWidth
                />
                <datalist id="urFullNameOptions">
                  {urData.map((item, index) => (
                    <option key={index} value={item.urFullName} />
                  ))}
                </datalist>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField label="ЄДРПОУ" list="edrpouOptions" {...register('edrpou')} />
                <datalist id="edrpouOptions">
                  {urData.map((item, index) => (
                    <option key={index} value={item.edrpou} />
                  ))}
                </datalist>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={9}>
                <Button variant="contained" type="submit" color="primary">
                  Додати
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Link to="/students">
                  <Button variant="contained" color="primary">
                    Повернутися
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default PaymentForm;
