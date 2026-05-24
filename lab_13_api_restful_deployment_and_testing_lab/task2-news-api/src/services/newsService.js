// ============================================================
// newsService.js
// Handles all communication with NewsAPI.org
// ============================================================

const axios = require("axios");

const BASE_URL = "https://newsapi.org/v2";

// Valid 2-letter country codes supported by NewsAPI
const VALID_COUNTRIES = new Set([
  "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn",
  "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu",
  "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma",
  "mx", "my", "ng", "nl", "no", "nz", "ph", "pk", "pl", "pt",
  "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr",
  "tw", "ua", "us", "ve", "za",
]);

// Valid categories
const VALID_CATEGORIES = new Set([
  "business", "entertainment", "general", "health", "science", "sports", "technology",
]);

// ── Helper: format a single article ─────────────────────────
const formatArticle = (article) => ({
  title: article.title || "No title",
  source: article.source?.name || "Unknown Source",
  url: article.url || null,
  publishedAt: article.publishedAt
    ? new Date(article.publishedAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })
    : "Unknown date",
  description: article.description || "No description available",
  author: article.author || "Unknown author",
});

// ── Get Top Headlines by Country ────────────────────────────
const getHeadlinesByCountry = async (country, limit = 10) => {
  const countryLower = country.toLowerCase();

  if (!VALID_COUNTRIES.has(countryLower)) {
    const err = new Error(`Invalid country code: "${country}"`);
    err.statusCode = 400;
    err.hint = "Use a valid 2-letter ISO country code (e.g., us, pk, gb, in, ae)";
    throw err;
  }

  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: countryLower,
      pageSize: Math.min(limit, 10),
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  const articles = response.data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .slice(0, limit)
    .map(formatArticle);

  return {
    country: countryLower.toUpperCase(),
    totalResults: response.data.totalResults,
    articlesReturned: articles.length,
    articles,
    fetchedAt: new Date().toISOString(),
  };
};

// ── Get Headlines by Country + Category ─────────────────────
const getHeadlinesByCategory = async (country, category, limit = 10) => {
  const countryLower = country.toLowerCase();
  const categoryLower = category.toLowerCase();

  if (!VALID_COUNTRIES.has(countryLower)) {
    const err = new Error(`Invalid country code: "${country}"`);
    err.statusCode = 400;
    err.hint = "Use a valid 2-letter ISO country code (e.g., us, pk, gb, in, ae)";
    throw err;
  }

  if (!VALID_CATEGORIES.has(categoryLower)) {
    const err = new Error(`Invalid category: "${category}"`);
    err.statusCode = 400;
    err.hint = `Valid categories: ${[...VALID_CATEGORIES].join(", ")}`;
    throw err;
  }

  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: countryLower,
      category: categoryLower,
      pageSize: Math.min(limit, 10),
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  const articles = response.data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .slice(0, limit)
    .map(formatArticle);

  return {
    country: countryLower.toUpperCase(),
    category: categoryLower,
    totalResults: response.data.totalResults,
    articlesReturned: articles.length,
    articles,
    fetchedAt: new Date().toISOString(),
  };
};

// ── Search Headlines by Keyword ──────────────────────────────
const searchHeadlines = async (keyword, limit = 10) => {
  if (!keyword || keyword.trim().length < 2) {
    const err = new Error("Search keyword must be at least 2 characters");
    err.statusCode = 400;
    throw err;
  }

  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: keyword.trim(),
      pageSize: Math.min(limit, 10),
      sortBy: "publishedAt",
      language: "en",
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  const articles = response.data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .slice(0, limit)
    .map(formatArticle);

  return {
    keyword: keyword.trim(),
    totalResults: response.data.totalResults,
    articlesReturned: articles.length,
    articles,
    fetchedAt: new Date().toISOString(),
  };
};

module.exports = { getHeadlinesByCountry, getHeadlinesByCategory, searchHeadlines };
