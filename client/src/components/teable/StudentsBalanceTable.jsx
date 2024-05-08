import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

import axios from 'axios';

const StudentsBalanceTable = () => {
  const [balanceData, setBalanceData] = useState([]);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/balance/getAll`);
      console.log(res.data);

      setBalanceData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const columns = useMemo(
    () => [
      // Include the formatted date column

      {
        accessorFn: (row) =>
          `${row.student.lastName} ${row.student.firstName} ${row.student.middleName}`,
        header: "Призвище Ім'я",
        accessorKey: 'student',
        size: 300,
      },

      {
        header: 'на початок',
        accessorKey: 'balanceStart',
        aggregationFn: 'sum',
        AggregatedCell: ({ cell }) => <div style={{ color: 'blue' }}>{cell.getValue()}</div>,
      },
      {
        header: 'нараховано',
        accessorKey: 'accrued',
        aggregationFn: 'sum',
        AggregatedCell: ({ cell }) => <div style={{ color: 'blue' }}>{cell.getValue()}</div>,
      },
      {
        header: 'сплачено',
        accessorKey: 'payment',
        aggregationFn: 'sum',
        AggregatedCell: ({ cell }) => <div style={{ color: 'blue' }}>{cell.getValue()}</div>,
      },
      {
        header: 'на кінець',
        accessorKey: 'balanceEnd',
        aggregationFn: 'sum',
        AggregatedCell: ({ cell }) => <div style={{ color: 'blue' }}>{cell.getValue()}</div>,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const textColor = value < 0 ? 'red' : 'inherit'; // определение цвета текста
          return (
            <Typography variant="p" style={{ color: textColor }}>
              {cell.getValue()}
            </Typography>
          );
        },
      },
      { header: 'рік', accessorKey: 'year' },
      {
        header: 'місяць',
        accessorKey: 'month',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const date = new Date(null, value - 1); // value - 1, так как месяцы в JavaScript начинаются с 0
          const monthName = date.toLocaleString('uk-UA', { month: 'long' });
          return <div>{monthName}</div>;
        },
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: balanceData,
    localization: MRT_Localization_UK, // українська локалізація
    enableGrouping: true, // включити групування
    enableColumnResizing: true, // включити зміну розміру колонок
    enableColumnFilterModes: true, // включити фільтрацію колонок по режимах
    initialState: {
      showColumnFilters: false, // показувати фільтри колонок
      density: 'compact', // плотний режим
      grouping: ['year', 'month'], // групувати за роком і місяцем
      expanded: true, //развернуть все группы по умолчанию
      pagination: { pageIndex: 0, pageSize: 20 }, // пагинация
    },
  });

  return <MaterialReactTable table={table} />;
};

export default StudentsBalanceTable;
