// app.js - Express application setup and middleware configuration

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const requestLogger = require("./middleware/requestLogger");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const weatherRoutes = require("./routes/weatherRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lab 14 - API Testing Server is running",
    version: "1.0.0",
    endpoints: {
      weather: "GET /api/weather?city=<cityName>",
      news: "GET /api/news?country=<countryCode>",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound);        // 404 for unmatched routes
app.use(errorHandler);    // centralized error handler

module.exports = app;
