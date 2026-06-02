// tests/unit/weatherFormatter.test.js
// Unit tests for the weather data formatter utility

const { formatWeatherData } = require("../../utils/weatherFormatter");

// Sample valid OpenWeather API response fixture
const mockWeatherApiResponse = {
  name: "Lahore",
  sys: { country: "PK" },
  main: {
    temp: 32.7,
    feels_like: 36.1,
    temp_min: 30.0,
    temp_max: 35.5,
    humidity: 55,
  },
  weather: [
    {
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: { speed: 3.2 },
  visibility: 10000,
  dt: 1717000000,
};

describe("weatherFormatter - formatWeatherData()", () => {
  // ── Happy path ───────────────────────────────────────────────────────────────

  it("should return a formatted object with all required fields", () => {
    const result = formatWeatherData(mockWeatherApiResponse);

    expect(result).toHaveProperty("cityName");
    expect(result).toHaveProperty("country");
    expect(result).toHaveProperty("temperature");
    expect(result).toHaveProperty("weatherCondition");
    expect(result).toHaveProperty("humidity");
    expect(result).toHaveProperty("wind");
    expect(result).toHaveProperty("timestamp");
  });

  it("should correctly map city name from API response", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.cityName).toBe("Lahore");
  });

  it("should correctly map country code", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.country).toBe("PK");
  });

  it("should round temperature values to whole numbers", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.temperature.current).toBe(33); // Math.round(32.7)
    expect(result.temperature.feelsLike).toBe(36);
    expect(result.temperature.min).toBe(30);
    expect(result.temperature.max).toBe(36); // Math.round(35.5)
  });

  it("should set temperature unit to Celsius", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.temperature.unit).toBe("Celsius");
  });

  it("should correctly map weather condition fields", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.weatherCondition.main).toBe("Clear");
    expect(result.weatherCondition.description).toBe("clear sky");
    expect(result.weatherCondition.icon).toContain("01d");
  });

  it("should correctly map humidity value", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.humidity).toBe(55);
  });

  it("should correctly map wind speed", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.wind.speed).toBe(3.2);
    expect(result.wind.unit).toBe("m/s");
  });

  it("should convert visibility from meters to kilometers", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.visibility).toBe(10); // 10000m -> 10km
  });

  it("should return a valid ISO timestamp string", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("should construct the correct weather icon URL", () => {
    const result = formatWeatherData(mockWeatherApiResponse);
    expect(result.weatherCondition.icon).toBe(
      "https://openweathermap.org/img/wn/01d@2x.png"
    );
  });

  it("should handle missing wind data gracefully (default to 0)", () => {
    const dataWithoutWind = { ...mockWeatherApiResponse, wind: undefined };
    const result = formatWeatherData(dataWithoutWind);
    expect(result.wind.speed).toBe(0);
  });

  it("should return null for visibility if not present in API response", () => {
    const dataWithoutVisibility = {
      ...mockWeatherApiResponse,
      visibility: undefined,
    };
    const result = formatWeatherData(dataWithoutVisibility);
    expect(result.visibility).toBeNull();
  });

  // ── Error cases ──────────────────────────────────────────────────────────────

  it("should throw an error when called with null", () => {
    expect(() => formatWeatherData(null)).toThrow(
      "Invalid weather data: expected an object"
    );
  });

  it("should throw an error when called with undefined", () => {
    expect(() => formatWeatherData(undefined)).toThrow(
      "Invalid weather data: expected an object"
    );
  });

  it("should throw an error when called with a string", () => {
    expect(() => formatWeatherData("not an object")).toThrow(
      "Invalid weather data: expected an object"
    );
  });

  it("should throw an error when 'name' field is missing", () => {
    const { name, ...dataWithoutName } = mockWeatherApiResponse;
    expect(() => formatWeatherData(dataWithoutName)).toThrow(
      'Invalid weather data: missing field "name"'
    );
  });

  it("should throw an error when 'main' field is missing", () => {
    const { main, ...dataWithoutMain } = mockWeatherApiResponse;
    expect(() => formatWeatherData(dataWithoutMain)).toThrow(
      'Invalid weather data: missing field "main"'
    );
  });

  it("should throw an error when weather array is empty", () => {
    const dataWithEmptyWeather = {
      ...mockWeatherApiResponse,
      weather: [],
    };
    expect(() => formatWeatherData(dataWithEmptyWeather)).toThrow(
      "Invalid weather data: weather array is empty"
    );
  });
});
