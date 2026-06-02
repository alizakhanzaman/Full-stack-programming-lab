// server.js - Application entry point. Starts the HTTP server.

const app = require("./app");
const config = require("./config/config");

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║     Lab 14 - API Testing Server Started      ║");
  console.log("╠══════════════════════════════════════════════╣");
  console.log(`║  Server running on: http://localhost:${PORT}     ║`);
  console.log(`║  Environment:       ${config.nodeEnv.padEnd(25)}║`);
  console.log("╠══════════════════════════════════════════════╣");
  console.log(`║  Weather API: GET /api/weather?city=Lahore   ║`);
  console.log(`║  News API:    GET /api/news?country=us        ║`);
  console.log(`║  Health:      GET /api/health                 ║`);
  console.log("╚══════════════════════════════════════════════╝");
});

// Graceful shutdown on termination signals
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

module.exports = server;
