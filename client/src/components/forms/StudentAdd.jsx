import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import axios from 'axios';

const StudentAdd = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/student/create`, data);
      navigate('/students');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Додати студента
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Призвище"
              variant="outlined"
              fullWidth
              {...register('lastName', { required: true, minLength: 2, maxLength: 20 })}
              error={!!errors.lastName}
              helperText={errors.lastName && "Це поле є обов'язковим"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Ім'я"
              variant="outlined"
              fullWidth
              {...register('firstName', { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName && "Це поле є обов'язковим"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="По-батькові"
              variant="outlined"
              fullWidth
              {...register('middleName', { required: true })}
              error={!!errors.middleName}
              helperText={errors.middleName && "Це поле є обов'язковим"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
              {...register('phone')}
              error={!!errors.phone}
            />
          </Grid>
        </Grid>
        <Stack
          ddirection="row"
          justifyContent="flex-end"
          alignItems="end"
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <Button type="onSubmit" variant="contained" startIcon={<PersonAddIcon />}>
            Додати
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default StudentAdd;
