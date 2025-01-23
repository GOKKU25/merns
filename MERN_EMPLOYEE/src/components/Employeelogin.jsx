import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Employeelogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Employee login attempted', { email, password });

    navigate('/employeelist'); 
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
          boxShadow: '0 4px 20px rgba(49, 180, 255, 0.7)', 
        }}
      >
        <Typography variant="h5" align="center" gutterBottom style={{color:'blue'}}>
          Employee Login
        </Typography>
        
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Employeelogin;
