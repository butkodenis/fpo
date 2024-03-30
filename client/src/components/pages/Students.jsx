import { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/getAll`);
      setStudents(res.data);
      // console.log(res.data);
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
      { Header: 'Призвище', accessor: 'lastName' },
      { Header: "Ім'я", accessor: 'firstName' },
      { Header: "По-батьков ім'я", accessor: 'middleName' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Паспорт', accessor: 'passport' },
      {
        Header: 'Дія...',
        Cell: ({ row }) => (
          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={`/students/${row.original._id}`}>
                  Детально
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`/students/${row.original._id}/addContract`}>
                  Додати договір
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`/students/${row.original._id}/addPayment`}>
                  Додати платіж
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item btn btn-danger  text-danger"
                  type="button"
                  onClick={() => deleteStudent(row.original._id)}
                >
                  Видалити
                </button>
              </li>
            </ul>
          </div>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: students,
  });

  return (
    <div className="d-flex flex-column">
      <h4>Students</h4>
      <Link to="/students/add" className="btn btn-primary btn-sm w-25 mb-4">
        <i className="bi bi-person-plus-fill"></i>
      </Link>
      <table className="table-sm  table-striped table border " {...getTableProps()}>
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
              <tr className="border" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="border" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
