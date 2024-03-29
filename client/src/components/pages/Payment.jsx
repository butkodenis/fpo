import React from 'react';
import { Link } from 'react-router-dom';
import PaymentTable from '../teable/PaymentTable';

const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <Link to="/payment/add">Додати платіж</Link>
      <PaymentTable />
    </div>
  );
};

export default Payment;
