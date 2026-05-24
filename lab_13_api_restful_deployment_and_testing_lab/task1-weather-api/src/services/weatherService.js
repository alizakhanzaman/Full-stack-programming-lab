// ============================================================
// weatherService.js
// Handles all communication with OpenWeatherMap API
// ============================================================

const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// ── Helper: build URL ────────────────────────────────────────
const buildUrl = (endpoint, city) => {
  const key = process.env.OPENWEATHER_API_KEY;
  return `${BASE_URL}/${endpoint}?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
};

// ── Current Weather ──────────────────────────────────────────
const getCurrentWeather = async (city) => {
  const url = buildUrl("weather", city);
  const response = await axios.get(url);
  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temperature: {
      current: data.main.temp,
      feelsLike: data.main.feels_like,
      min: data.main.temp_min,
      max: data.main.temp_max,
      unit: "Celsius",
    },
    condition: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    },
    humidity: `${data.main.humidity}%`,
    windSpeed: `${data.wind.speed} m/s`,
    visibility: data.visibility ? `${data.visibility / 1000} km` : "N/A",
    pressure: `${data.main.pressure} hPa`,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    fetchedAt: new Date().toISOString(),
  };
};

// ── 5-Day Forecast ───────────────────────────────────────────
const getForecast = async (city) => {
  const url = buildUrl("forecast", city);
  const response = await axios.get(url);
  const data = response.data;

  // Group forecasts by date (one entry per day, prefer 12:00)
  const dailyMap = {};
  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    const time = entry.dt_txt.split(" ")[1];
    if (!dailyMap[date] || time === "12:00:00") {
      dailyMap[date] = entry;
    }
  });

  const forecast = Object.entries(dailyMap)
    .slice(0, 5)
    .map(([date, entry]) => ({
      date,
      temperature: {
        current: entry.main.temp,
        min: entry.main.temp_min,
        max: entry.main.temp_max,
        unit: "Celsius",
      },
      condition: {
        main: entry.weather[0].main,
        description: entry.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
      },
      humidity: `${entry.main.humidity}%`,
      windSpeed: `${entry.wind.speed} m/s`,
    }));

  return {
    city: data.city.name,
    country: data.city.country,
    forecastDays: forecast.length,
    forecast,
    fetchedAt: new Date().toISOString(),
  };
};

module.exports = { getCurrentWeather, getForecast };
