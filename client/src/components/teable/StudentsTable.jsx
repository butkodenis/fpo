import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';

import axios from 'axios';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/getAll`);
      setStudents(res.data);
      //console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/student/${id}/delete`,
      );
      console.log(response.data);
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.lastName} ${row.firstName} ${row.middleName}`,
        header: 'ПІБ',
        accessorKey: 'fullName',
      },
      { header: 'Телефон', accessorKey: 'phone' },
      { header: 'Паспорт', accessorKey: 'passport' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: students,
    localization: MRT_Localization_UK,
    enableRowActions: true,
    initialState: {
      density: 'compact',
      showColumnFilters: true,
      pagination: {
        pageSize: 30,
      },
    },
    renderRowActionMenuItems: ({ row }) => [
      <div>
        <ul class="list-group list-group-flush ">
          <li class="list-group-item  ">
            <Link className="btn  btn-sm" to={`/students/${row.original._id}`}>
              <i className="bi bi-eye"></i> Детально
            </Link>
          </li>
          <li class="list-group-item">
            <Link className="btn  btn-sm" to={`/students/${row.original._id}/addContract`}>
              <i class="bi bi-file-text"></i> Додати договір
            </Link>
          </li>

          <li class="list-group-item">
            <Link className="btn  btn-sm" to={`/students/${row.original._id}/addPayment`}>
              <i class="bi bi-credit-card"></i> Додати платіж
            </Link>
          </li>

          <li class="list-group-item">
            <button
              className="btn  btn-sm "
              type="button"
              onClick={() => deleteStudent(row.original._id)}
            >
              <i className="bi bi-trash"></i> Видалити
            </button>
          </li>
        </ul>
      </div>,
    ],
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default StudentsTable;
