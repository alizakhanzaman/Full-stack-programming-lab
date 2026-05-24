// ============================================================
// newsRoutes.js
// Defines all /api/news routes
// ============================================================

const express = require("express");
const router = express.Router();
const { getNewsByCountry, getNewsByCategory, searchNews } = require("../controllers/newsController");

/**
 * @route  GET /api/news/search/:keyword
 * @desc   Search news articles by keyword
 * @access Public
 * @param  {string} keyword - Search keyword
 * @query  {number} limit   - Number of articles (default: 10, max: 10)
 *
 * @example
 *   GET http://localhost:6000/api/news/search/cricket
 *   GET http://localhost:6000/api/news/search/AI?limit=5
 *
 * NOTE: This route MUST come before /:country to avoid "search" being
 *       treated as a country code.
 */
router.get("/search/:keyword", searchNews);

/**
 * @route  GET /api/news/:country/category/:category
 * @desc   Get top headlines by country and category
 * @access Public
 * @param  {string} country  - 2-letter ISO country code (e.g., us, pk, gb)
 * @param  {string} category - One of: business, entertainment, general,
 *                              health, science, sports, technology
 * @query  {number} limit    - Number of articles (default: 10, max: 10)
 *
 * @example
 *   GET http://localhost:6000/api/news/us/category/technology
 *   GET http://localhost:6000/api/news/pk/category/sports?limit=5
 */
router.get("/:country/category/:category", getNewsByCategory);

/**
 * @route  GET /api/news/:country
 * @desc   Get top headlines for a country
 * @access Public
 * @param  {string} country - 2-letter ISO country code (e.g., us, pk, gb, in, ae)
 * @query  {number} limit   - Number of articles (default: 10, max: 10)
 *
 * @example
 *   GET http://localhost:6000/api/news/pk
 *   GET http://localhost:6000/api/news/us?limit=5
 *   GET http://localhost:6000/api/news/gb
 */
router.get("/:country", getNewsByCountry);

module.exports = router;
