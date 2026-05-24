// ============================================================
// weatherRoutes.js
// Defines all /api/weather routes
// ============================================================

const express = require("express");
const router = express.Router();
const { getWeatherByCity, getForecastByCity } = require("../controllers/weatherController");

/**
 * @route  GET /api/weather/:city
 * @desc   Get current weather for a city
 * @access Public
 * @param  {string} city - City name (e.g., Karachi, London, New York)
 *
 * @example
 *   GET http://localhost:5000/api/weather/Karachi
 *   GET http://localhost:5000/api/weather/London
 *   GET http://localhost:5000/api/weather/New%20York
 */
router.get("/:city", getWeatherByCity);

/**
 * @route  GET /api/weather/:city/forecast
 * @desc   Get 5-day weather forecast for a city
 * @access Public
 * @param  {string} city - City name
 *
 * @example
 *   GET http://localhost:5000/api/weather/Islamabad/forecast
 *   GET http://localhost:5000/api/weather/Dubai/forecast
 */
router.get("/:city/forecast", getForecastByCity);

module.exports = router;
