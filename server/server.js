const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  }); 

// Routes
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/blog', require('./routes/blog'));

// Health check endpoint
app.get("/favicon.ico", (req, res) => res.status(204));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
