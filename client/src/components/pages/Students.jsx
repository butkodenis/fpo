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

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/delete`);
      console.log(id);
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
      <table className="table-sm table border ">
        <thead>
          <tr>
            <th>Призвище</th>
            <th>Ім'я</th>
            <th>По-батькові</th>
            <th>Phone</th>
            <th>Старт курсів</th>
            <th>Кінець курсів</th>
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
                    className="btn btn-secondary dropdown-toggle btn-sm"
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
                      <button
                        class="dropdown-item"
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
