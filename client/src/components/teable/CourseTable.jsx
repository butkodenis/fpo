import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { formatDate } from '../util';

const CourseTable = () => {
  const [courseData, setCourseData] = useState([]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getAll`);

      setCourseData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Тип курсу',
        accessor: 'specialty',
      },
      {
        Header: 'Спеціальність/Профіль',
        accessor: 'typeCourse',
      },
      {
        Header: 'Тривалість навчання	',
        accessor: 'duration',
      },
      {
        Header: 'Вартість навчання, грн',
        accessor: 'price',
      },
      {
        Header: 'Наказ №',
        accessor: 'order',
      },
      {
        Header: 'Дата наказу',
        accessor: 'orderDate',
        Cell: ({ value }) => formatDate(value),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: courseData,
  });

  return (
    <div className="conteiner rounded ">
      <table className="table-sm  table-striped table border" {...getTableProps()}>
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
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
