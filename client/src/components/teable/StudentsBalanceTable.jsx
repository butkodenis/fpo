import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
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
      {
        Header: 'Full Name',
        accessor: (row) => `${row.student.lastName} ${row.student.firstName}`,
      },

      { Header: 'на початок', accessor: 'balanceStart' },
      { Header: 'нараховано', accessor: 'accrued' },
      { Header: 'сплачено', accessor: 'payment' },
      { Header: 'на кінець', accessor: 'balanceEnd' },
      {
        Header: 'період',
        accessor: 'period',
        // Функция для отображения месяца и года в ячейке "период"
        Cell: ({ value }) => {
          const date = new Date(value);
          const month = date.toLocaleString('default', { month: 'long' });
          const year = date.getFullYear();
          return `${month} ${year}`;
        },
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: balanceData,
  });

  return (
    <div className="conteiner bg-info rounded border border-2  p-2 ">
      <table className=" table-striped  table " {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsBalanceTable;
