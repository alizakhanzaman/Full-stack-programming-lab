// tests/unit/newsFormatter.test.js
// Unit tests for the news data formatter utility

const { formatNewsData, formatArticle } = require("../../utils/newsFormatter");

// Sample valid NewsAPI response fixture
const mockNewsApiResponse = {
  status: "ok",
  totalResults: 2,
  articles: [
    {
      source: { id: "bbc-news", name: "BBC News" },
      author: "BBC Reporter",
      title: "Pakistan wins cricket series against England",
      description: "Pakistan secured a dramatic series win in the final Test.",
      url: "https://bbc.com/sport/cricket/12345",
      urlToImage: "https://bbc.com/images/cricket.jpg",
      publishedAt: "2024-06-01T10:00:00Z",
      content: "Full content here...",
    },
    {
      source: { id: "geo-news", name: "Geo News" },
      author: null,
      title: "Stock market reaches record high",
      description: null,
      url: "https://geo.tv/markets/67890",
      urlToImage: null,
      publishedAt: "2024-06-01T09:30:00Z",
      content: "Market content...",
    },
  ],
};

describe("newsFormatter - formatArticle()", () => {
  // ── Happy path ───────────────────────────────────────────────────────────────

  it("should return all expected fields for a complete article", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("source");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("publishedAt");
    expect(result).toHaveProperty("imageUrl");
  });

  it("should correctly map title and description", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result.title).toBe("Pakistan wins cricket series against England");
    expect(result.description).toBe(
      "Pakistan secured a dramatic series win in the final Test."
    );
  });

  it("should extract source name from nested source object", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result.source).toBe("BBC News");
  });

  it("should correctly map author name", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result.author).toBe("BBC Reporter");
  });

  it("should return a valid ISO 8601 publishedAt string", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("should map urlToImage to imageUrl field", () => {
    const result = formatArticle(mockNewsApiResponse.articles[0]);
    expect(result.imageUrl).toBe("https://bbc.com/images/cricket.jpg");
  });

  // ── Default / null handling ──────────────────────────────────────────────────

  it("should default author to 'Unknown' when null", () => {
    const result = formatArticle(mockNewsApiResponse.articles[1]);
    expect(result.author).toBe("Unknown");
  });

  it("should default description to 'No description available' when null", () => {
    const result = formatArticle(mockNewsApiResponse.articles[1]);
    expect(result.description).toBe("No description available");
  });

  it("should return null for imageUrl when urlToImage is null", () => {
    const result = formatArticle(mockNewsApiResponse.articles[1]);
    expect(result.imageUrl).toBeNull();
  });

  it("should return 'Unknown' for source when source is missing", () => {
    const result = formatArticle({ ...mockNewsApiResponse.articles[0], source: null });
    expect(result.source).toBe("Unknown");
  });
});

describe("newsFormatter - formatNewsData()", () => {
  // ── Happy path ───────────────────────────────────────────────────────────────

  it("should return an object with country, totalResults, articleCount, and articles", () => {
    const result = formatNewsData(mockNewsApiResponse, "pk");
    expect(result).toHaveProperty("country");
    expect(result).toHaveProperty("totalResults");
    expect(result).toHaveProperty("articleCount");
    expect(result).toHaveProperty("articles");
  });

  it("should uppercase the country code in the response", () => {
    const result = formatNewsData(mockNewsApiResponse, "pk");
    expect(result.country).toBe("PK");
  });

  it("should map totalResults from API response", () => {
    const result = formatNewsData(mockNewsApiResponse, "pk");
    expect(result.totalResults).toBe(2);
  });

  it("should return correct article count", () => {
    const result = formatNewsData(mockNewsApiResponse, "pk");
    expect(result.articleCount).toBe(2);
    expect(result.articles).toHaveLength(2);
  });

  it("should filter out articles with '[Removed]' title", () => {
    const dataWithRemoved = {
      ...mockNewsApiResponse,
      articles: [
        ...mockNewsApiResponse.articles,
        { title: "[Removed]", source: { name: "N/A" } },
      ],
    };
    const result = formatNewsData(dataWithRemoved, "us");
    expect(result.articleCount).toBe(2); // [Removed] article excluded
  });

  it("should return articles as an array of formatted objects", () => {
    const result = formatNewsData(mockNewsApiResponse, "us");
    expect(Array.isArray(result.articles)).toBe(true);
    result.articles.forEach((article) => {
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("source");
    });
  });

  // ── Error cases ──────────────────────────────────────────────────────────────

  it("should throw an error when called with null", () => {
    expect(() => formatNewsData(null, "us")).toThrow(
      "Invalid news data: expected an object"
    );
  });

  it("should throw an error when articles field is missing", () => {
    expect(() => formatNewsData({ totalResults: 0 }, "us")).toThrow(
      "Invalid news data: articles must be an array"
    );
  });

  it("should throw an error when articles is not an array", () => {
    expect(() =>
      formatNewsData({ totalResults: 1, articles: "bad" }, "us")
    ).toThrow("Invalid news data: articles must be an array");
  });

  it("should handle an empty articles array without errors", () => {
    const emptyData = { ...mockNewsApiResponse, articles: [], totalResults: 0 };
    const result = formatNewsData(emptyData, "us");
    expect(result.articles).toHaveLength(0);
    expect(result.articleCount).toBe(0);
  });
});
