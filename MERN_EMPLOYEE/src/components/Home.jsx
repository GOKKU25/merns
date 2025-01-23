import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';  

const Home = () => {
  const [employees, setEmployees] = useState([]);  
  const [error, setError] = useState('');
  const navigate = useNavigate();  
  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data); 
      })
      .catch(error => {
        setError('There was an error fetching the employees data!');
        console.error('Error fetching employees data:', error);
      });
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

  if (!employees.length) { 
    return <div>Loading...</div>;
  }

  const handleUpdateClick = (employee) => {
 
    navigate('/addemployee', { state: { employee } });
  };

  const handleDeleteClick = (employeeId) => {
 
    axios.delete(`http://localhost:5000/api/employees/${employeeId}`)
      .then((response) => {
        if (response.status === 200) {
     
          setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
        }
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        {employees.map((employee) => (
          <Grid item xs={12} sm={4} md={4} key={employee._id}>
            <Card sx={{ width: 345, height: 300, display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  NAME: {employee.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Employee ID: {employee.employeeId}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Designation: {employee.designation}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Salary: {employee.salary}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Department: {employee.department}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Location: {employee.location}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleUpdateClick(employee)}>UPDATE</Button>
                <Button size="small" onClick={() => handleDeleteClick(employee._id)}>DELETE</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
