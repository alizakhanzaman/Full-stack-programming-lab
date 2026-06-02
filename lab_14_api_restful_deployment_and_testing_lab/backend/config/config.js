// config/config.js - Centralized application configuration
require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // OpenWeather API configuration
  weather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5",
    units: "metric", // Celsius
  },

  // NewsAPI configuration
  news: {
    apiKey: process.env.NEWS_API_KEY,
    baseUrl: "https://newsapi.org/v2",
    pageSize: 10,
  },

  // Valid ISO 3166-1 alpha-2 country codes supported by NewsAPI
  validCountryCodes: [
    "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn",
    "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu",
    "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma",
    "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro",
    "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw",
    "ua", "us", "ve", "za",
  ],
};

module.exports = config;
