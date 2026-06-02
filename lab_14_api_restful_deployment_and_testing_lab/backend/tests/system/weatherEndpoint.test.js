// tests/system/weatherEndpoint.test.js
// System tests for the Weather Forecast API
// Tests the complete request-to-response pipeline including routing,
// validation, service layer, formatting, and error middleware.

const request = require("supertest");
const app = require("../../app");

jest.mock("axios");
const axios = require("axios");

// Comprehensive mock for a realistic multi-field OpenWeather response
const buildWeatherResponse = (overrides = {}) => ({
  data: {
    name: "Karachi",
    sys: { country: "PK", sunrise: 1717000100, sunset: 1717045000 },
    main: {
      temp: 35.2,
      feels_like: 40.0,
      temp_min: 33.0,
      temp_max: 37.5,
      humidity: 80,
      pressure: 1010,
    },
    weather: [{ main: "Haze", description: "haze", icon: "50d" }],
    wind: { speed: 5.5, deg: 200 },
    visibility: 5000,
    dt: 1717025000,
    ...overrides,
  },
});

describe("Weather API - System Tests (End-to-End Pipeline)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── Route existence and server-level checks ──────────────────────────────────

  it("GET /api/weather should exist and return JSON", async () => {
    axios.get.mockResolvedValueOnce(buildWeatherResponse());
    const res = await request(app).get("/api/weather?city=Karachi");
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should return a response with a 'success' boolean field at the top level", async () => {
    axios.get.mockResolvedValueOnce(buildWeatherResponse());
    const res = await request(app).get("/api/weather?city=Karachi");
    expect(typeof res.body.success).toBe("boolean");
  });

  // ── Full successful pipeline ─────────────────────────────────────────────────

  it("should complete the full request pipeline and return 200 with all data fields", async () => {
    axios.get.mockResolvedValueOnce(buildWeatherResponse());
    const res = await request(app).get("/api/weather?city=Karachi");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const { data } = res.body;
    expect(data.cityName).toBe("Karachi");
    expect(data.country).toBe("PK");
    expect(data.temperature.current).toBe(35);
    expect(data.temperature.feelsLike).toBe(40);
    expect(data.temperature.unit).toBe("Celsius");
    expect(data.weatherCondition.main).toBe("Haze");
    expect(data.humidity).toBe(80);
    expect(data.wind.speed).toBe(5.5);
    expect(data.visibility).toBe(5); // 5000m -> 5km
    expect(data.timestamp).toBeDefined();
  });

  it("should correctly round fractional temperatures through the full pipeline", async () => {
    axios.get.mockResolvedValueOnce(buildWeatherResponse());
    const res = await request(app).get("/api/weather?city=Karachi");
    expect(Number.isInteger(res.body.data.temperature.current)).toBe(true);
    expect(Number.isInteger(res.body.data.temperature.min)).toBe(true);
    expect(Number.isInteger(res.body.data.temperature.max)).toBe(true);
  });

  // ── Validation layer in full pipeline ───────────────────────────────────────

  it("should block the request at validation and return 400 before hitting service", async () => {
    const res = await request(app).get("/api/weather?city=");
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(axios.get).not.toHaveBeenCalled(); // service was never called
  });

  it("should block requests with numeric city names at validation layer", async () => {
    const res = await request(app).get("/api/weather?city=12345");
    expect(res.status).toBe(400);
    expect(axios.get).not.toHaveBeenCalled();
  });

  // ── Service error propagation through full pipeline ─────────────────────────

  it("should propagate 404 from service layer through error middleware", async () => {
    const err = new Error("City not found");
    err.response = { status: 404 };
    axios.get.mockRejectedValueOnce(err);

    const res = await request(app).get("/api/weather?city=Atlantis");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/not found/i);
  });

  it("should propagate 401 (invalid API key) through the full pipeline", async () => {
    const err = new Error("Unauthorized");
    err.response = { status: 401 };
    axios.get.mockRejectedValueOnce(err);

    const res = await request(app).get("/api/weather?city=Paris");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should handle network failure (no response) through full error pipeline", async () => {
    const err = new Error("Network Error");
    err.request = {};
    axios.get.mockRejectedValueOnce(err);

    const res = await request(app).get("/api/weather?city=Tokyo");

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/network failure|external service/i);
  });

  // ── 404 for unknown routes ───────────────────────────────────────────────────

  it("should return 404 for an unrecognised route", async () => {
    const res = await request(app).get("/api/unknownroute");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // ── Health check ─────────────────────────────────────────────────────────────

  it("GET /api/health should return 200 and healthy status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe("healthy");
  });

  it("GET / (root) should return server info with endpoint references", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.endpoints).toBeDefined();
    expect(res.body.endpoints.weather).toBeDefined();
  });
});
