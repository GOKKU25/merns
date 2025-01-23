import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom'; 

const Employeelist = () => {
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

 
  const handleLogout = () => {
    
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        {employees.map((employee) => (
          <Grid item xs={12} sm={4} md={4} key={employee._id}>
            <Card sx={{ 
              width: 345,
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px'
            }}>
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
              
            </Card>
          </Grid>
        ))}
      </Grid>

 
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px', display: 'block', width: '10%' }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Employeelist;
