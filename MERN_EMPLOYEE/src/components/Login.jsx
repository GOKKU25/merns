import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const Login = () => {
  const navigate = useNavigate();

  const navigateToEmployeeLogin = () => {
    navigate('/employee-login');
  };

  const navigateToAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login as
          </Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                onClick={navigateToEmployeeLogin}
              >
                Employee
              </Button>
            </Grid>
            <Grid item>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                onClick={navigateToAdminLogin}
              >
                Admin
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

