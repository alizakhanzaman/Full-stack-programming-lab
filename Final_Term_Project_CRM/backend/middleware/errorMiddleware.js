// ── Error Middleware ──────────────────────────────────────────────
// Catches any error passed via next(err) from controllers/routes.
// Must have exactly 4 parameters — Express identifies it as an
// error handler only when all four (err, req, res, next) are present.

const errorHandler = (err, req, res, next) => {
  // Use the status code already set on the response, or default to 500
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",

    // Only expose the full stack trace in development — never in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// ── 404 Handler ───────────────────────────────────────────────────
// Catches any request that doesn't match a defined route.
// Must be registered AFTER all other routes in server.js.

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error); // pass it to errorHandler above
};

module.exports = { errorHandler, notFound };