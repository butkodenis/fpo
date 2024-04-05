import React from 'react';
import { Link } from 'react-router-dom';
import PaymentTable from '../teable/PaymentTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PaymentTable />
      </LocalizationProvider>
    </div>
  );
};

export default Payment;
