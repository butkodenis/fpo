import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Container, Typography, Grid, Stack, TextField, MenuItem } from '@mui/material';

const StudentAddContract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getAll`);
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/student/${id}/addContract`,
        data,
      );
      console.log(res.data);
      navigate('/students');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Container>
        <Box sx={{ width: 720 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Курс"
                  select
                  id="courseId"
                  defaultValue={''}
                  fullWidth
                  helperText="Выберите курс"
                  {...register('courseId')}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {`${course.typeCourse} ${course.specialty} (${course.price})`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Дата начала"
                    type="date"
                    {...register('startDate')}
                    fullWidth
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Дата окончания"
                    type="date"
                    {...register('endDate')}
                    fullWidth
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12} sm={8}>
                  <TextField label="Юр. особа" {...register('urFullName')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="ЄДРПОУ" {...register('edrpou')} fullWidth />
                </Grid>
              </Grid>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12} sm={3}>
                  <TextField label="№ договору" type="number" {...register('num')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Від"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    {...register('numDate')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Частинами"
                    type="number"
                    {...register('part')}
                    defaultValue={1}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Дата оплати"
                    type="date"
                    {...register('payDate')}
                    fullWidth
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    helperText="Дата оплаты"
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12} sm={3}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
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
      </Container>
    </>
  );
};

export default StudentAddContract;
