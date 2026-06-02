// utils/weatherValidator.js - Input validation for weather API requests

const { AppError } = require("../middleware/errorHandler");

/**
 * Validates that the city query parameter is present and properly formatted.
 * @param {string} city - City name from query string
 * @throws {AppError} if city is missing or invalid
 */
const validateCity = (city) => {
  if (!city || typeof city !== "string") {
    throw new AppError("City parameter is required.", 400);
  }

  const trimmed = city.trim();

  if (trimmed.length === 0) {
    throw new AppError("City name cannot be empty.", 400);
  }

  if (trimmed.length < 2) {
    throw new AppError("City name must be at least 2 characters long.", 400);
  }

  if (trimmed.length > 100) {
    throw new AppError("City name is too long (max 100 characters).", 400);
  }

  // Allow letters, spaces, hyphens, apostrophes, and dots (e.g., "St. Louis", "Lahore")
  const cityPattern = /^[a-zA-Z\s\-'.]+$/;
  if (!cityPattern.test(trimmed)) {
    throw new AppError(
      "City name contains invalid characters. Use only letters, spaces, hyphens, or apostrophes.",
      400
    );
  }

  return trimmed;
};

module.exports = { validateCity };
