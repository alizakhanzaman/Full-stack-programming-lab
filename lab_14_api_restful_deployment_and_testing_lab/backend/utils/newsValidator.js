// utils/newsValidator.js - Input validation for news API requests

const { AppError } = require("../middleware/errorHandler");
const config = require("../config/config");

/**
 * Validates the country code parameter for the News API.
 * @param {string} country - ISO 3166-1 alpha-2 country code
 * @returns {string} - Lowercase validated country code
 * @throws {AppError} if country is missing or unsupported
 */
const validateCountryCode = (country) => {
  if (!country || typeof country !== "string") {
    throw new AppError(
      'Country code parameter is required. Example: GET /api/news?country=us',
      400
    );
  }

  const trimmed = country.trim().toLowerCase();

  if (trimmed.length === 0) {
    throw new AppError("Country code cannot be empty.", 400);
  }

  if (!/^[a-z]{2}$/.test(trimmed)) {
    throw new AppError(
      `"${country}" is not a valid format. Country code must be exactly 2 letters (e.g., "us", "pk", "gb").`,
      400
    );
  }

  if (!config.validCountryCodes.includes(trimmed)) {
    throw new AppError(
      `Country code "${country}" is not supported by NewsAPI. ` +
        `Supported codes include: us, gb, au, ca, in, pk, de, fr, jp, etc.`,
      400
    );
  }

  return trimmed;
};

module.exports = { validateCountryCode };
