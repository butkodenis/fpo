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
      { header: 'Призвище', accessorKey: 'student.lastName', filterVariant: 'text' },
      { header: "Ім'я", accessorKey: 'student.firstName' },
      { header: 'По-батькові', accessorKey: 'student.middleName' },
      {
        header: 'Нараховано',
        accessorKey: 'amount',
        filterVariant: 'range',
        filterFn: 'between',
        aggregationFn: 'sum',
        AggregatedCell: ({ cell }) => (
          <div className="badge text-bg-primary">{cell.getValue()}</div>
        ),
        Cell: ({ cell }) => <div className="badge text-bg-light">{cell.getValue()}</div>,
      },

      {
        header: 'Дата оплати',
        id: 'payDate',
        accessorFn: (originalRow) => new Date(originalRow.payDate),
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue().toLocaleDateString(),
      },
      { header: 'Номер платіжу', accessorKey: 'numberPayment' },
      { header: 'Юр. особа', accessorKey: 'urFullName' },
      { header: 'ЕДРПОУ', accessorKey: 'edrpou' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: paymentData,
    localization: MRT_Localization_UK,
    enableGrouping: true, // включити групування
    enableColumnResizing: true, // включити зміну розміру колонок
    initialState: {
      showColumnFilters: false, // показувати фільтри колонок
      density: 'compact', // плотність таблиці
      expanded: false, // розгорнутий рядок
      grouping: ['payDate'], // групування по даті
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  });

  useEffect(() => {
    fetchPayment();
  }, []);

  return <MaterialReactTable table={table} />;
};

export default PaymentTable;
