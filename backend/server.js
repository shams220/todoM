const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoute');


const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors());         // Enable CORS for all requests

// Root endpoint (simple test)
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Route Middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/todo', todoRoutes);  // Mount todo routes only once
// app.use('/api/v1/user',todoRoutes)

// Start the server
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
