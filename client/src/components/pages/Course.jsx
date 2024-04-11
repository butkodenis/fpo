import React from 'react';
import CourseTable from '../teable/CourseTable';

const Course = () => {
  return (
    <div className="d-flex flex-column">
      <div className="">
        <h4>Курси</h4>
        <CourseTable />
      </div>
    </div>
  );
};

export default Course;
