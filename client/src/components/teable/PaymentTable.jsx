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
      { header: 'lastName', accessorKey: 'student.lastName', filterVariant: 'text' },
      { header: 'firstName', accessorKey: 'student.firstName' },
      { header: 'middleName', accessorKey: 'student.middleName' },
      { header: 'Amount', accessorKey: 'amount', filterVariant: 'range', filterFn: 'between' },

      {
        header: 'Payment Date',
        id: 'payDate',
        accessorFn: (originalRow) => new Date(originalRow.payDate),
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue().toLocaleDateString(),
      },
      { header: 'Number Payment', accessorKey: 'numberPayment' },
      { header: 'UR Full Name', accessorKey: 'urFullName' },
      { header: 'EDRPOU', accessorKey: 'edrpou' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: paymentData,
    localization: MRT_Localization_UK,
    initialState: { showColumnFilters: true },
  });

  useEffect(() => {
    fetchPayment();
  }, []);

  return <MaterialReactTable table={table} />;
};

export default PaymentTable;
