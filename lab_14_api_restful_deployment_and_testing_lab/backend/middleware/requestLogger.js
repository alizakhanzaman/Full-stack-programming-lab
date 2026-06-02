// middleware/requestLogger.js - Logs incoming HTTP requests

const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  }
  next();
};

module.exports = requestLogger;
