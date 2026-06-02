// tests/integration/weather.test.js
// Integration tests for the Weather Forecast API endpoint
// Axios is mocked so no real API calls are made during testing

const request = require("supertest");
const app = require("../../app");

// Mock the entire axios module to prevent real HTTP calls
jest.mock("axios");
const axios = require("axios");

// Standard successful OpenWeather API response fixture
const mockOpenWeatherSuccess = {
  data: {
    name: "London",
    sys: { country: "GB" },
    main: {
      temp: 18.5,
      feels_like: 17.0,
      temp_min: 15.0,
      temp_max: 20.0,
      humidity: 72,
    },
    weather: [
      {
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    wind: { speed: 4.1 },
    visibility: 9000,
    dt: 1717000000,
  },
};

describe("Weather API - Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── Successful requests ──────────────────────────────────────────────────────

  describe("GET /api/weather - Successful Requests", () => {
    it("should return 200 with formatted weather data for a valid city", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it("should include all required weather fields in the response", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.body.data).toHaveProperty("cityName", "London");
      expect(res.body.data).toHaveProperty("country", "GB");
      expect(res.body.data).toHaveProperty("temperature");
      expect(res.body.data).toHaveProperty("weatherCondition");
      expect(res.body.data).toHaveProperty("humidity", 72);
      expect(res.body.data).toHaveProperty("wind");
      expect(res.body.data).toHaveProperty("timestamp");
    });

    it("should return temperature in Celsius with correct unit label", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.body.data.temperature.unit).toBe("Celsius");
      expect(res.body.data.temperature.current).toBe(19); // Math.round(18.5)
    });

    it("should return correct Content-Type header (application/json)", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should call the OpenWeather API with the correct city parameter", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      await request(app).get("/api/weather?city=Lahore");

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("openweathermap.org"),
        expect.objectContaining({
          params: expect.objectContaining({ q: "Lahore" }),
        })
      );
    });

    it("should trim whitespace from city name before calling the API", async () => {
      axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);

      const res = await request(app).get("/api/weather?city=  London  ");

      expect(res.status).toBe(200);
      expect(axios.get).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          params: expect.objectContaining({ q: "London" }),
        })
      );
    });
  });

  // ── Validation errors (no API call made) ────────────────────────────────────

  describe("GET /api/weather - Missing/Invalid City Parameter", () => {
    it("should return 400 when city query param is missing", async () => {
      const res = await request(app).get("/api/weather");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/required/i);
      expect(axios.get).not.toHaveBeenCalled();
    });

    it("should return 400 when city is an empty string", async () => {
      const res = await request(app).get("/api/weather?city=");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(axios.get).not.toHaveBeenCalled();
    });

    it("should return 400 when city contains invalid characters (numbers)", async () => {
      const res = await request(app).get("/api/weather?city=City123");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/invalid characters/i);
    });

    it("should return 400 for a single-character city name", async () => {
      const res = await request(app).get("/api/weather?city=A");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ── External API errors ──────────────────────────────────────────────────────

  describe("GET /api/weather - External API Error Handling", () => {
    it("should return 404 when city is not found by OpenWeather API", async () => {
      const notFoundError = new Error("City not found");
      notFoundError.response = { status: 404, data: { message: "city not found" } };
      axios.get.mockRejectedValueOnce(notFoundError);

      const res = await request(app).get("/api/weather?city=FakeCityXYZ");

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/not found/i);
    });

    it("should return 401 when the API key is invalid", async () => {
      const authError = new Error("Unauthorized");
      authError.response = { status: 401, data: { message: "Invalid API key" } };
      axios.get.mockRejectedValueOnce(authError);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/api key/i);
    });

    it("should return 503 when there is a network failure (no response)", async () => {
      const networkError = new Error("Network Error");
      networkError.request = {}; // Simulates no response received
      axios.get.mockRejectedValueOnce(networkError);

      const res = await request(app).get("/api/weather?city=London");

      expect(res.status).toBe(503);
      expect(res.body.success).toBe(false);
    });
  });
});
