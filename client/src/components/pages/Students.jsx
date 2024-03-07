import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/getAll`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showAdditionalInfo = (studentId) => {
    // Выбираем студента для отображения дополнительной информации
    setSelectedStudent(studentId);
  };

  const hideAdditionalInfo = () => {
    // Скрываем дополнительную информацию
    setSelectedStudent(null);
  };

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
            <React.Fragment key={student._id}>
              <tr>
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
                <td className="d-flex">
                  <button
                    className="btn btn-secondary"
                    onClick={() => showAdditionalInfo(student._id)}
                  >
                    Подробнее
                  </button>
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
              {selectedStudent === student._id && (
                <tr>
                  <td colSpan="7">
                    {/* Здесь вы можете разместить дополнительную информацию */}
                    Дополнительная информация о студенте с ID: {student._id}
                    <button className="btn btn-link" onClick={hideAdditionalInfo}>
                      Скрыть
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
