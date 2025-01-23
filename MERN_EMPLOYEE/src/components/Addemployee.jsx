import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [employeeID, setEmployeeID] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [locationInput, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);  

  useEffect(() => {
    if (location.state?.employee) {
      const { employee } = location.state;
      setEmployeeID(employee.employeeId);
      setName(employee.name);
      setDesignation(employee.designation);
      setSalary(employee.salary);
      setDepartment(employee.department);
      setLocation(employee.location);
      setIsEdit(true);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      employeeId: employeeID,
      name,
      designation,
      salary,
      department,
      location: locationInput,
    };

    try {
      let response;
      if (isEdit) {
      
        response = await fetch(`http://localhost:5000/api/employees/${employeeID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });
      } else {
      
        response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });
      }

      if (response.ok) {
        setMessage(isEdit ? 'Employee updated successfully!' : 'Employee added successfully!');
        setEmployeeID('');
        setName('');
        setDesignation('');
        setSalary('');
        setDepartment('');
        setLocation('');
       
        navigate('/home');
      } else {
        setMessage(isEdit ? 'Error updating employee. Please try again.' : 'Error adding employee. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
          padding: 4,
          boxShadow: 3,
          backgroundColor: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </Typography>

        {message && (
          <Typography variant="body2" color={message.includes('successfully') ? 'success' : 'error'} align="center">
            {message}
          </Typography>
        )}

        <TextField
          label="Employee ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          required
          disabled={isEdit} 
        />

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Designation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          margin="normal"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            label="Department"
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={locationInput}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddEmployee;
