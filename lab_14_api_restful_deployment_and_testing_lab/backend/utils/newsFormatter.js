// utils/newsFormatter.js - Formats raw NewsAPI response into clean API response

/**
 * Formats a single article object from the NewsAPI response.
 * @param {Object} article - Raw article from NewsAPI
 * @returns {Object} - Cleaned article object
 */
const formatArticle = (article) => {
  return {
    title: article.title || "No title available",
    description: article.description || "No description available",
    source: article.source ? article.source.name : "Unknown",
    author: article.author || "Unknown",
    url: article.url || null,
    publishedAt: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : null,
    imageUrl: article.urlToImage || null,
  };
};

/**
 * Formats the full NewsAPI response into a structured API response object.
 * @param {Object} data - Raw NewsAPI response
 * @param {string} country - Country code used in the request
 * @returns {Object} - Formatted news data
 */
const formatNewsData = (data, country) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid news data: expected an object");
  }

  if (!Array.isArray(data.articles)) {
    throw new Error("Invalid news data: articles must be an array");
  }

  // Filter out articles with [Removed] content (NewsAPI sometimes returns placeholder articles)
  const validArticles = data.articles.filter(
    (a) => a.title && a.title !== "[Removed]"
  );

  return {
    country: country.toUpperCase(),
    totalResults: data.totalResults || 0,
    articleCount: validArticles.length,
    articles: validArticles.map(formatArticle),
  };
};

module.exports = { formatNewsData, formatArticle };
