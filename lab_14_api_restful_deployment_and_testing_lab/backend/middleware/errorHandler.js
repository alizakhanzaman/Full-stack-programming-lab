// middleware/errorHandler.js - Centralized error handling middleware

/**
 * Custom error class for API-specific errors with HTTP status codes.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // marks expected/handled errors
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Express error-handling middleware (4 params = error handler).
 * Catches all errors forwarded via next(err) and returns structured JSON.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Axios network/HTTP errors from external APIs
  if (err.response) {
    // External API responded with a non-2xx status
    statusCode = err.response.status === 401 ? 401 : 502;
    message =
      err.response.status === 401
        ? "Invalid API key. Please check your environment configuration."
        : "External API returned an error. Please try again later.";
  } else if (err.request) {
    // Request was made but no response received (network failure)
    statusCode = 503;
    message =
      "Could not reach external service. Check your internet connection.";
  } else if (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED") {
    statusCode = 503;
    message = "Network failure: Unable to connect to external service.";
  }

  // Log error details in development mode only
  if (process.env.NODE_ENV !== "test") {
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (process.env.NODE_ENV === "development" && err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Middleware for unmatched routes (404 handler).
 */
const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = { errorHandler, notFound, AppError };
