import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';

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
        header: 'Тип курсу',
        accessorKey: 'specialty',
        size: 500,
      },
      {
        header: 'Спеціальність/Профіль',
        accessorKey: 'typeCourse',
      },
      {
        header: 'Тривалість навчання	',
        accessorKey: 'duration',
      },
      {
        header: 'Вартість навчання, грн',
        accessorKey: 'price',
      },
      {
        header: 'Наказ №',
        accessorKey: 'order',
      },
      {
        header: 'Дата наказу',
        accessorKey: 'orderDate',
        accessorFn: (row) => new Date(row.orderDate),
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('uk-UA'),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: courseData,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      showColumnFilters: false,
      density: 'compact',
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CourseTable;
