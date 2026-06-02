// services/weatherService.js - Handles communication with OpenWeather API

const axios = require("axios");
const config = require("../config/config");
const { AppError } = require("../middleware/errorHandler");

/**
 * Fetches current weather data for a given city from OpenWeather API.
 * @param {string} city - Name of the city
 * @returns {Promise<Object>} - Raw API response data
 * @throws {AppError} for city-not-found or invalid API key scenarios
 */
const fetchWeatherByCity = async (city) => {
  if (!config.weather.apiKey) {
    throw new AppError(
      "Weather API key is not configured. Set OPENWEATHER_API_KEY in your .env file.",
      500
    );
  }

  try {
    const response = await axios.get(`${config.weather.baseUrl}/weather`, {
      params: {
        q: city,
        appid: config.weather.apiKey,
        units: config.weather.units,
      },
      timeout: 10000, // 10 second timeout
    });

    return response.data;
  } catch (error) {
    // OpenWeather returns 404 when the city is not found
    if (error.response && error.response.status === 404) {
      throw new AppError(
        `City "${city}" not found. Please check the city name and try again.`,
        404
      );
    }

    // 401 means invalid API key
    if (error.response && error.response.status === 401) {
      throw new AppError(
        "Invalid OpenWeather API key. Please check your OPENWEATHER_API_KEY.",
        401
      );
    }

    // Re-throw all other errors to be caught by the centralized error handler
    throw error;
  }
};

module.exports = { fetchWeatherByCity };
