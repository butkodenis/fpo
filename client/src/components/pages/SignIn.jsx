import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Container, Typography, Grid, Button, TextField } from '@mui/material';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, data, {
        withCredentials: true,
      });
      console.log(res.data);
      // navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register('email', { required: true, minLength: 3 })}
              error={!!errors.email}
              helperText={errors.email && "Це поле є обов'язковим"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField label="Password" variant="outlined" fullWidth {...register('password')} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button type="onSubmit" variant="contained" color="primary">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignIn;
