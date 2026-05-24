// ============================================================
// newsController.js
// Handles request/response logic for news endpoints
// ============================================================

const {
  getHeadlinesByCountry,
  getHeadlinesByCategory,
  searchHeadlines,
} = require("../services/newsService");

// ── GET /api/news/:country ───────────────────────────────────
const getNewsByCountry = async (req, res) => {
  const { country } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  if (!country || country.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Country code is required",
      example: "GET /api/news/pk",
    });
  }

  try {
    const newsData = await getHeadlinesByCountry(country.trim(), limit);
    return res.status(200).json({ success: true, data: newsData });
  } catch (err) {
    return handleNewsError(err, res);
  }
};

// ── GET /api/news/:country/category/:category ────────────────
const getNewsByCategory = async (req, res) => {
  const { country, category } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  if (!country || !category) {
    return res.status(400).json({
      success: false,
      error: "Both country and category are required",
      example: "GET /api/news/us/category/technology",
      validCategories: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
    });
  }

  try {
    const newsData = await getHeadlinesByCategory(country.trim(), category.trim(), limit);
    return res.status(200).json({ success: true, data: newsData });
  } catch (err) {
    return handleNewsError(err, res);
  }
};

// ── GET /api/news/search/:keyword ───────────────────────────
const searchNews = async (req, res) => {
  const { keyword } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  if (!keyword || keyword.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Search keyword is required",
      example: "GET /api/news/search/cricket",
    });
  }

  try {
    const newsData = await searchHeadlines(keyword.trim(), limit);
    return res.status(200).json({ success: true, data: newsData });
  } catch (err) {
    return handleNewsError(err, res);
  }
};

// ── Error Handler Helper ─────────────────────────────────────
const handleNewsError = (err, res) => {
  // Custom validation errors thrown by service
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      hint: err.hint || null,
    });
  }

  // Axios errors (NewsAPI response)
  if (err.response) {
    const status = err.response.status;
    const apiMessage = err.response.data?.message || "Unknown error from News API";

    if (status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid or missing NEWS_API_KEY",
        hint: "Update NEWS_API_KEY in your .env file. Get a free key at https://newsapi.org/",
        apiMessage,
      });
    }

    if (status === 429) {
      return res.status(429).json({
        success: false,
        error: "News API rate limit exceeded",
        hint: "Free plan allows 100 requests/day. Wait until tomorrow or upgrade your plan.",
        apiMessage,
      });
    }

    if (status === 426) {
      return res.status(426).json({
        success: false,
        error: "Upgrade required",
        hint: "Some endpoints require a paid NewsAPI plan. Try /api/news/:country instead.",
        apiMessage,
      });
    }

    return res.status(status).json({
      success: false,
      error: "News service error",
      apiMessage,
    });
  }

  if (err.request) {
    return res.status(503).json({
      success: false,
      error: "Cannot reach News API service",
      hint: "Check your internet connection and try again",
    });
  }

  console.error("News controller error:", err.message);
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
};

module.exports = { getNewsByCountry, getNewsByCategory, searchNews };
