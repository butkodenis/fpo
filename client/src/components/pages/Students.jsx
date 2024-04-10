import { Link } from 'react-router-dom';

import StudentsTeable from '../teable/StudentsTable';

const Students = () => {
  return (
    <div className="d-flex flex-column">
      <h4>Студенти</h4>
      <Link to="/students/add" className="btn btn-primary btn-sm w-25 mb-4">
        <i className="bi bi-person-plus-fill"></i>
      </Link>

      <StudentsTeable />
    </div>
  );
};

export default Students;
