import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';

import axios from 'axios';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/getAll`);
      setStudents(res.data);
      //console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/student/${id}/delete`,
      );
      console.log(response.data);
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.lastName} ${row.firstName} ${row.middleName}`,
        header: 'ПІБ',
        accessorKey: 'fullName',
      },
      { header: 'Телефон', accessorKey: 'phone' },
      { header: 'Паспорт', accessorKey: 'passport' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: students,
    localization: MRT_Localization_UK,
    enableRowActions: true,
    initialState: {
      density: 'compact',
      showColumnFilters: true,
      pagination: {
        pageSize: 30,
      },
    },
    renderRowActionMenuItems: ({ row }) => [
      <Box
        key={row.original._id}
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      >
        <List>
          <ListItem>
            <ListItemButton component={Link} to={`/students/${row.original._id}`}>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              Детально
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to={`/students/${row.original._id}/addContract`}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              Додати договір
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to={`/students/${row.original._id}/addPayment`}>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              Додати платіж
            </ListItemButton>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemButton onClick={() => deleteStudent(row.original._id)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Видалити
            </ListItemButton>
          </ListItem>
        </List>
      </Box>,
    ],
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default StudentsTable;
