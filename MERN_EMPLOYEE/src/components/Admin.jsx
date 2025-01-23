import React, { useState } from 'react';
import { Button, Box, TextField, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage(''); 

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('admin_token', token);

      console.log('Login successful!');
      setSuccessMessage('Login successful!');
      navigate('/home'); 

    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, padding: 4, boxShadow: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'red' }}>
          Admin Login
        </Typography>

        {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}
        {successMessage && <Typography variant="body2" color="success.main" align="center">{successMessage}</Typography>}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
          sx={{ position: 'relative' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
