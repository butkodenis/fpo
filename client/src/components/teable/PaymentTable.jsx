import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';

import axios from 'axios';

const PaymentTable = () => {
  const [paymentData, setPaymentData] = useState([]);

  const fetchPayment = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/payment/getAll`);
      console.log(res.data);
      setPaymentData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = useMemo(
    () => [
      { header: 'lastName', accessorKey: 'student.lastName', size: 150 },
      { header: 'firstName', accessorKey: 'student.firstName', size: 150 },
      { header: 'middleName', accessorKey: 'student.middleName', size: 150 },
      { header: 'Amount', accessorKey: 'amount', size: 150 },
      { header: 'Payment Date', accessorKey: 'payDate', size: 150 },
      { header: 'Number Payment', accessorKey: 'numberPayment', size: 150 },
      { header: 'UR Full Name', accessorKey: 'urFullName', size: 150 },
      { header: 'EDRPOU', accessorKey: 'edrpou', size: 150 },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: paymentData,
    enableRowActions: true,
    enableRowSelection: true,
    localization: MRT_Localization_UK,
  });

  useEffect(() => {
    fetchPayment();
  }, []);

  return <MaterialReactTable table={table} />;
};

export default PaymentTable;
