import { useEffect, useState, useMemo } from 'react';
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

  return (
    <div className="d-flex flex-column">
      <h4>Students</h4>
      <Link to="/students/add" className="btn btn-primary btn-sm">
        Add Student
      </Link>
      <table className="table-sm  table-striped table border ">
        <thead>
          <tr>
            <th>Призвище</th>
            <th>Ім'я</th>
            <th>По-батькові</th>
            <th>Phone</th>
            <th>Паспорт</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.middleName}</td>
              <td>{student.phone}</td>
              <td> </td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-info dropdown-toggle btn-sm"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={`/students/${student._id}`}>
                        Детально
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`/students/${student._id}/addContract`}>
                        Додати договір
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item btn btn-danger  text-danger"
                        type="button"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Видалити
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
