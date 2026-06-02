// routes/newsRoutes.js - News API route definitions

const express = require("express");
const router = express.Router();
const { getNews } = require("../controllers/newsController");

/**
 * @route  GET /api/news?country=<countryCode>
 * @desc   Get top news headlines for a country
 * @access Public
 * @param  {string} country - ISO 3166-1 alpha-2 country code (e.g., us, gb, pk)
 * @returns {Object} { success, data: { country, totalResults, articleCount, articles[] } }
 */
router.get("/", getNews);

module.exports = router;
