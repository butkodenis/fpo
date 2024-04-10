import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';

import axios from 'axios';

const StudentsTeable = () => {
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
      { header: 'Призвище', accessorKey: 'lastName' },
      { header: "Ім'я", accessorKey: 'firstName' },
      { header: 'По-батькові', accessorKey: 'middleName' },
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
    renderRowActionMenuItems: ({ row }) => [
      <div>
        <ul class="list-group">
          <li class="dropdown-item">
            <button className="btn btn-info btn-sm">
              <i className="bi bi-trash"></i>
            </button>
          </li>
          <li class="dropdown-item">
            {' '}
            <Link className="btn btn-info btn-sm" to={`/students/${row.original._id}`}>
              <i className="bi bi-eye"></i>
            </Link>
          </li>
          <li class="dropdown-item">
            <Link className="btn btn-info btn-sm" to={`/students/${row.original._id}/addContract`}>
              Додати договір
            </Link>
          </li>
          <li class="dropdown-item">
            <Link className="btn btn-info btn-sm" to={`/students/${row.original._id}/addPayment`}>
              Додати платіж
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li class="dropdown-item">
            <button
              className="dropdown-item btn btn-danger  text-danger"
              type="button"
              onClick={() => deleteStudent(row.original._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        </ul>
      </div>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default StudentsTeable;
