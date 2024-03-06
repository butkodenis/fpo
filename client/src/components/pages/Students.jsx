import { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  return (
    <div className="d-flex flex-column   ">
      <h1>Students</h1>
      <div className="d-flex flex-column">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h2>Student 1</h2>
            <p>Student 1 info</p>
          </div>
          <div className="d-flex flex-column">
            <h2>Student 2</h2>
            <p>Student 2 info</p>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h2>Student 3</h2>
            <p>Student 3 info</p>
          </div>
          <div className="d-flex flex-column">
            <h2>Student 4</h2>
            <p>Student 4 info</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
