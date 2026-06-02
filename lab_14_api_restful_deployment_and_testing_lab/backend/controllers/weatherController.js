// controllers/weatherController.js - Handles weather API request/response logic

const { fetchWeatherByCity } = require("../services/weatherService");
const { formatWeatherData } = require("../utils/weatherFormatter");
const { validateCity } = require("../utils/weatherValidator");

/**
 * GET /api/weather?city=Lahore
 * Returns current weather data for the specified city.
 */
const getWeather = async (req, res, next) => {
  try {
    // Step 1: Validate input
    const city = validateCity(req.query.city);

    // Step 2: Fetch data from OpenWeather API
    const rawData = await fetchWeatherByCity(city);

    // Step 3: Format the response
    const weatherData = formatWeatherData(rawData);

    // Step 4: Return structured success response
    res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    // Forward to centralized error handler
    next(error);
  }
};

module.exports = { getWeather };
