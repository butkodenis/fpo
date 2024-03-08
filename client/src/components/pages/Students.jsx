import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/getAll`);
      setStudents(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="d-flex flex-column">
      <h1>Students</h1>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Phone</th>
            <th>Старт курсів</th>
            <th>Кінець курсів</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.middleName}</td>
              <td>{student.phone}</td>
              <td>
                {student.courses.length > 0 &&
                  new Date(student.courses[student.courses.length - 1].startDate)
                    .toISOString()
                    .split('T')[0]}
              </td>
              <td>
                {student.courses.length > 0 &&
                  new Date(student.courses[student.courses.length - 1].endDate)
                    .toISOString()
                    .split('T')[0]}
              </td>

              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
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
                      <a className="dropdown-item" href="#">
                        Додати курс
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Оновити дінні
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item " href="#">
                        Видалити
                      </a>
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
