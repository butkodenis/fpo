import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

import { formatDate } from '../util';

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
      {
        Header: 'Full Name',
        accessor: (row) => `${row.student.lastName} ${row.student.firstName}`,
      },

      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Payment Date', accessor: 'payDate', Cell: ({ value }) => formatDate(value) },
      { Header: 'Number Payment', accessor: 'numberPayment' },
      { Header: 'UR Full Name', accessor: 'urFullName' },
      { Header: 'EDRPOU', accessor: 'edrpou' },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: paymentData,
  });

  useEffect(() => {
    fetchPayment();
  }, []);

  return (
    <div>
      <table {...getTableProps()} className="table-striped table-sm table">
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

export default PaymentTable;
