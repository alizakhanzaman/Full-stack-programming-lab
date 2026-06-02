// services/newsService.js - Handles communication with NewsAPI.org

const axios = require("axios");
const config = require("../config/config");
const { AppError } = require("../middleware/errorHandler");

/**
 * Fetches top headlines from NewsAPI for the given country code.
 * @param {string} country - ISO 3166-1 alpha-2 country code (e.g., "us", "gb")
 * @returns {Promise<Object>} - Raw NewsAPI response data
 * @throws {AppError} for API key issues or service failures
 */
const fetchNewsByCountry = async (country) => {
  if (!config.news.apiKey) {
    throw new AppError(
      "News API key is not configured. Set NEWS_API_KEY in your .env file.",
      500
    );
  }

  try {
    const response = await axios.get(`${config.news.baseUrl}/top-headlines`, {
      params: {
        country,
        pageSize: config.news.pageSize,
        apiKey: config.news.apiKey,
      },
      timeout: 10000, // 10 second timeout
    });

    // NewsAPI returns 200 even for errors (like invalid API key), check the status field
    if (response.data.status === "error") {
      const code = response.data.code;
      if (code === "apiKeyInvalid" || code === "apiKeyDisabled") {
        throw new AppError(
          "Invalid News API key. Please check your NEWS_API_KEY.",
          401
        );
      }
      throw new AppError(
        response.data.message || "NewsAPI returned an error.",
        502
      );
    }

    return response.data;
  } catch (error) {
    // Only wrap errors that are not already AppErrors
    if (error.isOperational) {
      throw error;
    }

    if (error.response && error.response.status === 401) {
      throw new AppError(
        "Invalid News API key. Please check your NEWS_API_KEY.",
        401
      );
    }

    if (error.response && error.response.status === 429) {
      throw new AppError(
        "NewsAPI rate limit exceeded. Please wait before making more requests.",
        429
      );
    }

    throw error;
  }
};

module.exports = { fetchNewsByCountry };
