import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';

const StudentsBalanceTable = () => {
  const [balanceData, setBalanceData] = useState([]);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/balance/getAll`);
      // console.log(res.data);
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
      { Header: 'Призвище', accessor: 'student.lastName' },
      { Header: "Ім'я", accessor: 'student.firstName' },

      { Header: 'на початок', accessor: 'balanceStart' },
      { Header: 'нараховано', accessor: 'accrued' },
      { Header: 'сплачено', accessor: 'payment' },
      { Header: 'на кінець', accessor: 'balanceEnd' },
      { Header: 'рік', accessor: 'year' },
      { Header: 'місяць', accessor: 'month' },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: balanceData,
    },
    useSortBy,
  );

  return (
    <div className="table-sm  table-striped table ">
      <table className=" table-striped  table " {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
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
