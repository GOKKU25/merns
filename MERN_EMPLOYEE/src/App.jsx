import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeLogin from './components/Employeelogin';
import Admin from './components/Admin';
import Addemployee from './components/Addemployee';
import Main from './components/Main';
import Home from './components/Home';
import Employeelist from './components/Employeelist'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/admin-login" element={<Admin />} />
      <Route path="/home" element={<Main child={<Home />} />} />
      <Route path="/addemployee" element={<Main child={<Addemployee />} />} />
      <Route path="/employeelist" element={<Employeelist />} /> 
    </Routes>
  );
};

export default App;
