require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AI Ticketing CRM API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// Global Error Handler Middleware (Must be the last app.use)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in \({process.env.NODE_ENV || 'development'} mode on port\){PORT}`);
});