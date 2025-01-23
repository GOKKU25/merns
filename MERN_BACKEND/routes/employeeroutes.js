const express = require('express');
const EmployeeData = require('../models/employeedata'); 
const router = express.Router();

router.get('/employees', async (req, res) => {
  try {
    const employees = await EmployeeData.find();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeData.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Error fetching employee by ID:', err);
    res.status(500).json({ message: 'Error fetching employee by ID' });
  }
});

router.post('/employees', async (req, res) => {
  const { employeeId, name, designation, salary, department, location } = req.body;

  if (!employeeId || !name || !designation || !salary || !department || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEmployee = new EmployeeData({ employeeId, name, designation, salary, department, location });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ message: 'Error creating employee' });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, designation, salary, department, location } = req.body;

  if (!name || !designation || !salary || !department || !location) {
    return res.status(400).json({ message: 'All fields are required to update employee' });
  }

  try {
    const updatedEmployee = await EmployeeData.findByIdAndUpdate(
      id,
      { name, designation, salary, department, location },
      { new: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(400).json({ message: 'Error updating employee' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await EmployeeData.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(400).json({ message: 'Error deleting employee' });
  }
});

module.exports = router;
