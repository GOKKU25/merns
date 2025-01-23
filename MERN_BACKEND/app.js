const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeroutes');
const adminRoutes = require('./routes/adminroutes'); 

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://gokku:gokku_7025@gokku.cz4bx.mongodb.net/mernsdb?retryWrites=true&w=majority&appName=GOKKU', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api', employeeRoutes);
app.use('/api/admin', adminRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
