import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ADMIN 
            </Typography>
            <Button color="inherit" component={Link} to="/home">HOME</Button>
            <Button color="inherit" component={Link} to="/addemployee">ADD-EMPLOYEE</Button>
            <Button color="inherit" component={Link} to="/">LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
