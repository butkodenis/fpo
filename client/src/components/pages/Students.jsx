import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import StudentsTeable from '../teable/StudentsTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Students = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/student/create`, data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Link to="/students/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<PersonAddIcon />} fullWidth>
            Додати студента
          </Button>
        </Link>
        <Button onClick={handleOpen} variant="contained" startIcon={<PersonAddIcon />}>
          Open modal
        </Button>
      </Stack>
      <StudentsTeable />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </Box>
  );
};

export default Students;
