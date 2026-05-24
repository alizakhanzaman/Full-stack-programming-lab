// ============================================================
// weatherController.js
// Handles request/response logic for weather endpoints
// ============================================================

const { getCurrentWeather, getForecast } = require("../services/weatherService");

// ── GET /api/weather/:city ───────────────────────────────────
const getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  // Validate city param
  if (!city || city.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "City name is required",
      example: "GET /api/weather/Karachi",
    });
  }

  try {
    const weatherData = await getCurrentWeather(city.trim());
    return res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (err) {
    return handleWeatherError(err, res, city);
  }
};

// ── GET /api/weather/:city/forecast ─────────────────────────
const getForecastByCity = async (req, res) => {
  const { city } = req.params;

  if (!city || city.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "City name is required",
      example: "GET /api/weather/Lahore/forecast",
    });
  }

  try {
    const forecastData = await getForecast(city.trim());
    return res.status(200).json({
      success: true,
      data: forecastData,
    });
  } catch (err) {
    return handleWeatherError(err, res, city);
  }
};

// ── Error Handler Helper ─────────────────────────────────────
const handleWeatherError = (err, res, city) => {
  // Axios received a response from OpenWeather with a non-2xx status
  if (err.response) {
    const status = err.response.status;
    const owMessage = err.response.data?.message || "Unknown error from weather service";

    if (status === 404) {
      return res.status(404).json({
        success: false,
        error: `City "${city}" not found`,
        hint: "Check the spelling or try a different city name",
        openWeatherMessage: owMessage,
      });
    }

    if (status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid API key",
        hint: "Update OPENWEATHER_API_KEY in your .env file",
        openWeatherMessage: owMessage,
      });
    }

    if (status === 429) {
      return res.status(429).json({
        success: false,
        error: "API rate limit exceeded",
        hint: "Free tier allows 60 calls/minute. Please wait and try again.",
        openWeatherMessage: owMessage,
      });
    }

    return res.status(status).json({
      success: false,
      error: "Weather service error",
      openWeatherMessage: owMessage,
    });
  }

  // No response (network issue)
  if (err.request) {
    return res.status(503).json({
      success: false,
      error: "Cannot reach weather service",
      hint: "Check your internet connection and try again",
    });
  }

  // Something else went wrong
  console.error("Weather controller error:", err.message);
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
};

module.exports = { getWeatherByCity, getForecastByCity };
