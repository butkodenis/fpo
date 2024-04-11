import React from 'react';
import PaymentTable from '../teable/PaymentTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';

const Payment = () => {
  return (
    <Box>
      <h1>Платежі</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PaymentTable />
      </LocalizationProvider>
    </Box>
  );
};

export default Payment;
