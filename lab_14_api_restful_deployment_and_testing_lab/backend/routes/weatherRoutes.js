// routes/weatherRoutes.js - Weather API route definitions

const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

/**
 * @route  GET /api/weather?city=<cityName>
 * @desc   Get current weather data for a city
 * @access Public
 * @param  {string} city - City name (query parameter)
 * @returns {Object} { success, data: { cityName, temperature, weatherCondition, humidity, ... } }
 */
router.get("/", getWeather);

module.exports = router;
