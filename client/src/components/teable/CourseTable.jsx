import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const CourseTable = () => {
  const [courseData, setCourseData] = useState([]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/course/getAll`);
      console.log(res.data);
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
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: courseData,
  });

  return (
    <table className="table-striped table-hover table">
      <thead>
        <tr>
          <th scope="col">Назва курсу</th>
          <th scope="col">Вчитель</th>
          <th scope="col">Дата початку</th>
          <th scope="col">Дата закінчення</th>
          <th scope="col">Кількість учнів</th>
          <th scope="col">Вартість</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Назва курсу</td>
          <td>Вчитель</td>
          <td>Дата початку</td>
          <td>Дата закінчення</td>
          <td>Кількість учнів</td>
          <td>Вартість</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CourseTable;
