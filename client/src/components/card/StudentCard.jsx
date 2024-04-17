import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

import FormContract from '../forms/FormContract';

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/student/${id}/get`);

      setStudent(response.data.student);
      setContracts(response.data.contracts);
      setLoading(false);
      console.log(response.data); // Добавлено для отладки
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error(error); // Добавлено для отладки
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {student.lastName} {student.firstName} {student.middleName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                тел.: {student.phone}
              </Typography>

              <hr />
              {contracts.map((contract, index) => (
                <FormContract key={index} contract={contract} fetchStudent={fetchStudent} />
              ))}
              <hr />
              <Link to="/students">
                <Button variant="contained" color="primary">
                  Повернутися
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
};

export default StudentCard;
