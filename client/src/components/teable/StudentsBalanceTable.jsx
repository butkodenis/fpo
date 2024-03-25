import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const StudentsBalanceTable = () => {
  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/balance/getAll`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="conteiner ">
      <table className="table-bordered table">
        <thead>
          <tr>
            <th>Счет</th>
            <th>Наименование</th>
            <th>Дебет</th>
            <th>Кредит</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentsBalanceTable;
