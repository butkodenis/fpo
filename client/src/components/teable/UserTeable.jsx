import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import axios from 'axios';

import { Box, Typography } from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getAll`);
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      { header: 'ПІБ', accessorKey: 'name' },
      { header: 'email', accessorKey: 'email' },
      { header: 'роль', accessorKey: 'role' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
    localization: MRT_Localization_UK,
    initialState: {
      density: 'compact',
    },
  });

  return <>{isLoading ? <div>Loading...</div> : <MaterialReactTable table={table} />}</>;
};

export default UserTable;
