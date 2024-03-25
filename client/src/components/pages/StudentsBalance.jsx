import React from 'react';
import { useTable } from 'react-table';
import StudentsBalanseTable from '../teable/StudentsBalanseTable';

const StudentsBalance = () => {
  return (
    <div>
      <h3> оборотно-сальдовая ведомость</h3>
      <StudentsBalanseTable />
    </div>
  );
};

export default StudentsBalance;
