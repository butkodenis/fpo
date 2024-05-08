import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Item from '@mui/material/Grid';

const FormContract = ({ contract, fetchStudent }) => {
  const [activeForm, setActiveForm] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],
      payDate: contract.payDate.split('T')[0],
      part: contract.part,
      numOrder: contract.numOrder,
    },
  });

  const onSubmit = async (data) => {
    console.log(data); // для перевірки
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
      console.log(res.data); // для перевірки
    } catch (error) {
      console.error(error);
    } finally {
      setActiveForm(false);
      fetchStudent();
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={2}>
              <TextField label="Сума" defaultValue={contract.course.price} disabled />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Дата оплати"
                type="date"
                disabled={!activeForm}
                {...register('payDate')}
              />
            </Grid>

            <Grid item xs={4} sm={5}>
              {contract.urFullName && (
                <TextField
                  label="Юр. особа"
                  defaultValue={contract.urFullName}
                  sx={{ width: '100%' }}
                  disabled
                />
              )}
            </Grid>

            <Grid item xs={4} sm={3}>
              {contract.urFullName && (
                <TextField label="ЄДРПОУ" defaultValue={contract.edrpou} disabled />
              )}
            </Grid>

            <Grid item xs={4} sm={2}>
              <TextField label="Оплата частинами" type="number" disabled {...register('part')} />
            </Grid>

            <Grid item xs={4} sm={2}>
              <TextField
                label="Номер наказу"
                type="number"
                disabled={!activeForm}
                {...register('numOrder')}
              />
            </Grid>
            <Grid item xs={4} sm={6}></Grid>
            <Grid item xs={4} sm={6}>
              <TextField
                label="Курс"
                defaultValue={contract.course.specialty}
                sx={{ width: '100%' }}
                disabled
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <TextField label="Спеціалізація" defaultValue={contract.course.typeCourse} disabled />
            </Grid>
            <Grid item xs={4} sm={2}>
              <TextField label="Годин" defaultValue={contract.course.duration} disabled />
            </Grid>

            <Grid item xs={4} sm={2}>
              <TextField
                label="Дата початку"
                type="date"
                disabled={!activeForm}
                {...register('startDate')}
              />
            </Grid>
            <Grid item xs={4} sm={2}>
              <TextField
                label="Дата закінчення"
                type="date"
                disabled={!activeForm}
                {...register('endDate')}
              />
            </Grid>

            <Grid item xs={4} sm={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveForm(true)}
                  startIcon={<EditNoteIcon />}
                >
                  Редагувати
                </Button>
                {activeForm && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    Зберегти
                  </Button>
                )}
                {activeForm && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteContract}
                    startIcon={<DeleteIcon />}
                    disabled
                  >
                    Видалити
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
        <Divider />
      </Box>
    </>
  );
};

export default FormContract;
