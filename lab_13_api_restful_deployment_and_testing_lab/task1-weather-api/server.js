// ============================================================
// Task 1: Weather Forecast API
// Lab 13 - API RESTful Deployment and Testing
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const weatherRoutes = require("./src/routes/weatherRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve Browser UI ────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Welcome Route (JSON fallback) ───────────────────────────
app.get("/info", (req, res) => {
  res.json({
    message: "Welcome to the Weather Forecast API",
    author: "Lab 13 - Full Stack Programming",
    availableEndpoints: [
      {
        method: "GET",
        path: "/api/weather/:city",
        description: "Get current weather for a city",
        example: "/api/weather/Karachi",
      },
      {
        method: "GET",
        path: "/api/weather/:city/forecast",
        description: "Get 5-day forecast for a city",
        example: "/api/weather/Lahore/forecast",
      },
    ],
  });
});

// ── Weather Routes ──────────────────────────────────────────
app.use("/api/weather", weatherRoutes);

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    hint: "Try GET /api/weather/:city  (e.g., /api/weather/Islamabad)",
  });
});

// ── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.message);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`  Weather Forecast API running on port ${PORT}`);
  console.log(`  Base URL : http://localhost:${PORT}`);
  console.log(`  Test URL : http://localhost:${PORT}/api/weather/Karachi`);
  console.log("=========================================");
});
