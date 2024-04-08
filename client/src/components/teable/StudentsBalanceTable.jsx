import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';

import axios from 'axios';

const StudentsBalanceTable = () => {
  const [balanceData, setBalanceData] = useState([]);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/balance/getAll`);
      console.log(res.data);

      const formattedData = res.data.map((item) => {
        // Extract date from 'createdAt' (assuming it's a Date object)
        const date = new Date(item.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        // Format date as YYYY-MM for consistent sorting and display
        item.formattedDate = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`;

        return item;
      });

      setBalanceData(formattedData);
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
      { header: 'Період', accessorKey: 'formattedDate' },
      {
        accessorFn: (row) =>
          `${row.student.lastName} ${row.student.firstName} ${row.student.middleName}`,
        header: "Призвище Ім'я",
        accessorKey: 'student',
        size: 300,
      },

      { header: 'на початок', accessorKey: 'balanceStart' },
      { header: 'нараховано', accessorKey: 'accrued' },
      { header: 'сплачено', accessorKey: 'payment' },
      { header: 'на кінець', accessorKey: 'balanceEnd' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: balanceData,
    localization: MRT_Localization_UK,
    enableGrouping: true,
    enableColumnResizing: true,
    initialState: {
      showColumnFilters: false,
      density: 'compact',
      grouping: ['formattedDate'], // Group by the formatted date
      expanded: true, //expand all groups by default
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default StudentsBalanceTable;
