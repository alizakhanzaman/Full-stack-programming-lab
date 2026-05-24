// ============================================================
// Task 2: News Headlines API
// Lab 13 - API RESTful Deployment and Testing
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const newsRoutes = require("./src/routes/newsRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve Browser UI ────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Welcome Route (JSON fallback) ───────────────────────────
app.get("/info", (req, res) => {
  res.json({
    message: "Welcome to the News Headlines API",
    author: "Lab 13 - Full Stack Programming",
    validCountryCodes: [
      "us", "pk", "gb", "au", "ca", "in", "de", "fr", "jp", "ae",
      "sa", "cn", "ru", "br", "za", "ng", "eg", "it", "es", "kr",
    ],
    availableEndpoints: [
      {
        method: "GET",
        path: "/api/news/:country",
        description: "Get top headlines for a country (2-letter code)",
        example: "/api/news/pk",
      },
      {
        method: "GET",
        path: "/api/news/:country/category/:category",
        description: "Get top headlines by country and category",
        example: "/api/news/us/category/technology",
        categories: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
      },
      {
        method: "GET",
        path: "/api/news/search/:keyword",
        description: "Search news articles by keyword",
        example: "/api/news/search/cricket",
      },
    ],
  });
});

// ── News Routes ─────────────────────────────────────────────
app.use("/api/news", newsRoutes);

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    hint: "Try GET /api/news/:country  (e.g., /api/news/pk  or  /api/news/us)",
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
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`  News Headlines API running on port ${PORT}`);
  console.log(`  Base URL  : http://localhost:${PORT}`);
  console.log(`  Test URL  : http://localhost:${PORT}/api/news/pk`);
  console.log(`  US News   : http://localhost:${PORT}/api/news/us`);
  console.log(`  Search    : http://localhost:${PORT}/api/news/search/cricket`);
  console.log("=========================================");
});
