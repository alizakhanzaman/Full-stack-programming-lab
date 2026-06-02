// tests/unit/newsValidator.test.js
// Unit tests for the news country code validation utility

const { validateCountryCode } = require("../../utils/newsValidator");
const { AppError } = require("../../middleware/errorHandler");

describe("newsValidator - validateCountryCode()", () => {
  // ── Valid inputs ─────────────────────────────────────────────────────────────

  it("should return lowercase country code for a valid input", () => {
    expect(validateCountryCode("us")).toBe("us");
    expect(validateCountryCode("gb")).toBe("gb");
    expect(validateCountryCode("in")).toBe("in");
    expect(validateCountryCode("au")).toBe("au");
  });

  it("should convert uppercase to lowercase and accept it", () => {
    expect(validateCountryCode("US")).toBe("us");
    expect(validateCountryCode("GB")).toBe("gb");
  });

  it("should accept mixed case and normalize to lowercase", () => {
    expect(validateCountryCode("Us")).toBe("us");
    expect(validateCountryCode("gB")).toBe("gb");
  });

  it("should trim whitespace and validate the code", () => {
    expect(validateCountryCode("  us  ")).toBe("us");
  });

  it("should accept all valid NewsAPI country codes", () => {
    const validCodes = ["us", "gb", "au", "ca", "de", "fr", "jp", "in", "ru", "za"];
    validCodes.forEach((code) => {
      expect(() => validateCountryCode(code)).not.toThrow();
    });
  });

  // ── Missing / empty inputs ───────────────────────────────────────────────────

  it("should throw AppError when country is undefined", () => {
    expect(() => validateCountryCode(undefined)).toThrow(AppError);
    expect(() => validateCountryCode(undefined)).toThrow("required");
  });

  it("should throw AppError when country is null", () => {
    expect(() => validateCountryCode(null)).toThrow(AppError);
    expect(() => validateCountryCode(null)).toThrow("required");
  });

  it("should throw AppError when country is an empty string", () => {
    expect(() => validateCountryCode("")).toThrow(AppError);
    expect(() => validateCountryCode("")).toThrow("required");
  });

  it("should throw AppError when country is only whitespace", () => {
    expect(() => validateCountryCode("   ")).toThrow(AppError);
    expect(() => validateCountryCode("   ")).toThrow("cannot be empty");
  });

  // ── Format validation ────────────────────────────────────────────────────────

  it("should throw AppError for a single letter", () => {
    expect(() => validateCountryCode("u")).toThrow(AppError);
    expect(() => validateCountryCode("u")).toThrow("valid format");
  });

  it("should throw AppError for a 3-letter code (ISO 3166-1 alpha-3)", () => {
    expect(() => validateCountryCode("usa")).toThrow(AppError);
    expect(() => validateCountryCode("usa")).toThrow("valid format");
  });

  it("should throw AppError for codes with numbers", () => {
    expect(() => validateCountryCode("u1")).toThrow(AppError);
  });

  it("should throw AppError for codes with special characters", () => {
    expect(() => validateCountryCode("u@")).toThrow(AppError);
  });

  // ── Unsupported country codes ────────────────────────────────────────────────

  it("should throw AppError for a valid format but unsupported country code", () => {
    expect(() => validateCountryCode("xx")).toThrow(AppError);
    expect(() => validateCountryCode("xx")).toThrow("not supported");
  });

  it("should throw AppError for 'pk' as it is not in NewsAPI supported list", () => {
    // pk is not in the NewsAPI supported country list
    expect(() => validateCountryCode("pk")).toThrow(AppError);
    expect(() => validateCountryCode("pk")).toThrow("not supported");
  });

  // ── AppError statusCode ──────────────────────────────────────────────────────

  it("should throw AppError with statusCode 400 for missing country", () => {
    try {
      validateCountryCode(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    }
  });

  it("should throw AppError with statusCode 400 for invalid format", () => {
    try {
      validateCountryCode("xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    }
  });

  it("should throw AppError with statusCode 400 for unsupported code", () => {
    try {
      validateCountryCode("xx");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    }
  });
});
