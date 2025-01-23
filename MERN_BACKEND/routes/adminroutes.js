const express = require('express');
const jwt = require('jsonwebtoken');
const AdminData = require('../models/admindata');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request with:', { username, password }); 

  try {
   
    const admin = await AdminData.findOne({ username });

    if (!admin) {
      console.log('Admin not found');
      return res.status(400).json({ message: 'Admin not found' });
    }
    if (admin.password !== password) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'abcdefg',
      { expiresIn: '1h' }
    );

    console.log('Login successful');
    res.json({ token }); 
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
