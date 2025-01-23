const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      match: [/^EMP\d{4}$/, 'Employee ID must start with "EMP" followed by 4 digits'],
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: [0, 'Salary cannot be negative'], 
      max: [1000000, 'Salary cannot exceed 1,000,000'], 
    },
    department: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: 'Unknown',
    },
  },
  {
    timestamps: true, 
  }
);


module.exports = mongoose.model('Employee', employeeSchema, 'employees');
