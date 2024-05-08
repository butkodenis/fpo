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

  return (
    <Box>
      {isLoading ? <div>Loading...</div> : <Typography variant="h4">User Table</Typography>}
    </Box>
  );
};

export default UserTable;
