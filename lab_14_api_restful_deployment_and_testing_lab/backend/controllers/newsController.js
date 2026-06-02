// controllers/newsController.js - Handles news API request/response logic

const { fetchNewsByCountry } = require("../services/newsService");
const { formatNewsData } = require("../utils/newsFormatter");
const { validateCountryCode } = require("../utils/newsValidator");

/**
 * GET /api/news?country=us
 * Returns top news headlines for the specified country.
 */
const getNews = async (req, res, next) => {
  try {
    // Step 1: Validate input
    const country = validateCountryCode(req.query.country);

    // Step 2: Fetch headlines from NewsAPI
    const rawData = await fetchNewsByCountry(country);

    // Step 3: Format the response
    const newsData = formatNewsData(rawData, country);

    // Step 4: Return structured success response
    res.status(200).json({
      success: true,
      data: newsData,
    });
  } catch (error) {
    // Forward to centralized error handler
    next(error);
  }
};

module.exports = { getNews };
