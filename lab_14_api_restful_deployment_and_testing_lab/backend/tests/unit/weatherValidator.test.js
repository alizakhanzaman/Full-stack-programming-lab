// tests/unit/weatherValidator.test.js
// Unit tests for the weather input validation utility

const { validateCity } = require("../../utils/weatherValidator");
const { AppError } = require("../../middleware/errorHandler");

describe("weatherValidator - validateCity()", () => {
  // ── Valid inputs ─────────────────────────────────────────────────────────────

  it("should return the trimmed city name for a valid input", () => {
    expect(validateCity("Lahore")).toBe("Lahore");
    expect(validateCity("  London  ")).toBe("London");
    expect(validateCity("New York")).toBe("New York");
  });

  it("should accept city names with hyphens (e.g., Islamabad)", () => {
    expect(validateCity("Islamabad")).toBe("Islamabad");
    expect(validateCity("Al-Ain")).toBe("Al-Ain");
  });

  it("should accept city names with apostrophes (e.g., St. Paul's)", () => {
    expect(validateCity("St. Paul's")).toBe("St. Paul's");
  });

  it("should accept two-letter city names (minimum length)", () => {
    expect(validateCity("Ry")).toBe("Ry");
  });

  it("should trim whitespace from input", () => {
    const result = validateCity("   Karachi   ");
    expect(result).toBe("Karachi");
  });

  // ── Missing / empty inputs ───────────────────────────────────────────────────

  it("should throw AppError when city is undefined", () => {
    expect(() => validateCity(undefined)).toThrow(AppError);
    expect(() => validateCity(undefined)).toThrow("City parameter is required");
  });

  it("should throw AppError when city is null", () => {
    expect(() => validateCity(null)).toThrow(AppError);
    expect(() => validateCity(null)).toThrow("City parameter is required");
  });

  it("should throw AppError when city is an empty string", () => {
    expect(() => validateCity("")).toThrow(AppError);
    expect(() => validateCity("")).toThrow("City parameter is required");
  });

  it("should throw AppError when city is only whitespace", () => {
    expect(() => validateCity("   ")).toThrow(AppError);
    expect(() => validateCity("   ")).toThrow("cannot be empty");
  });

  it("should throw AppError when city is a number", () => {
    expect(() => validateCity(12345)).toThrow(AppError);
  });

  // ── Length validation ────────────────────────────────────────────────────────

  it("should throw AppError for single-character city name", () => {
    expect(() => validateCity("A")).toThrow(AppError);
    expect(() => validateCity("A")).toThrow("at least 2 characters");
  });

  it("should throw AppError for city names exceeding 100 characters", () => {
    const longCity = "A".repeat(101);
    expect(() => validateCity(longCity)).toThrow(AppError);
    expect(() => validateCity(longCity)).toThrow("too long");
  });

  it("should accept exactly 100 characters", () => {
    const city = "A".repeat(100);
    expect(() => validateCity(city)).not.toThrow();
  });

  // ── Character validation ─────────────────────────────────────────────────────

  it("should throw AppError for city name with numbers", () => {
    expect(() => validateCity("City123")).toThrow(AppError);
    expect(() => validateCity("City123")).toThrow("invalid characters");
  });

  it("should throw AppError for city with special characters like @", () => {
    expect(() => validateCity("Lah@re")).toThrow(AppError);
    expect(() => validateCity("Lah@re")).toThrow("invalid characters");
  });

  it("should throw AppError for SQL injection attempts", () => {
    expect(() => validateCity("'; DROP TABLE cities;--")).toThrow(AppError);
  });

  // ── AppError properties ──────────────────────────────────────────────────────

  it("should throw AppError with statusCode 400 for missing city", () => {
    try {
      validateCity(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    }
  });

  it("should throw AppError with statusCode 400 for invalid city", () => {
    try {
      validateCity("City123!");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    }
  });
});
