import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import StudentsTeable from '../teable/StudentsTable';

const Students = () => {
  return (
    <Box>
      <Link to="/students/add" style={{ textDecoration: 'none' }}>
        <Button variant="contained" startIcon={<PersonAddIcon />} fullWidth>
          Добавить студента
        </Button>
      </Link>

      <StudentsTeable />
    </Box>
  );
};

export default Students;
