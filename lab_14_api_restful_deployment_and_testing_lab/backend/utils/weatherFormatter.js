// utils/weatherFormatter.js - Formats raw OpenWeather API data into clean API response

/**
 * Formats the raw OpenWeather API response into a structured object.
 * @param {Object} data - Raw response data from OpenWeather API
 * @returns {Object} - Formatted weather data
 */
const formatWeatherData = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid weather data: expected an object");
  }

  const required = ["name", "main", "weather", "sys"];
  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Invalid weather data: missing field "${field}"`);
    }
  }

  if (!Array.isArray(data.weather) || data.weather.length === 0) {
    throw new Error("Invalid weather data: weather array is empty");
  }

  return {
    cityName: data.name,
    country: data.sys.country,
    temperature: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      unit: "Celsius",
    },
    weatherCondition: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    },
    humidity: data.main.humidity,
    wind: {
      speed: data.wind ? data.wind.speed : 0,
      unit: "m/s",
    },
    visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
    timestamp: new Date(data.dt * 1000).toISOString(),
  };
};

module.exports = { formatWeatherData };
