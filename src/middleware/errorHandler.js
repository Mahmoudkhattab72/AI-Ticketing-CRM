/**
 * Global Error Handler Middleware
 * Captures all thrown errors and formats the API response
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for developer debugging
  console.error(`[Error] ${err.stack || err.message}`);

  // 1. Mongoose bad ObjectId (e.g., fetching a ticket with invalid ID format)
  if (err.name === 'CastError') {
    const message = `Resource not found with ID of ${err.value}`;
    error = new Error(message);
    res.status(404);
  }

  // 2. Mongoose duplicate key (e.g., registering with an already existing email)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    res.status(400);
  }

  // 3. Mongoose validation error (e.g., missing required fields)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new Error(message);
    res.status(400);
  }

  // Determine the status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send formatted JSON response
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    // Only show stack trace in development environment for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;