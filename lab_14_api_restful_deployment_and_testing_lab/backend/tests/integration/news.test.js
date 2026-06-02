// tests/integration/news.test.js
// Integration tests for the News Headlines API endpoint
// Axios is mocked so no real API calls are made during testing

const request = require("supertest");
const app = require("../../app");

jest.mock("axios");
const axios = require("axios");

// Standard successful NewsAPI response fixture
const mockNewsApiSuccess = {
  data: {
    status: "ok",
    totalResults: 3,
    articles: [
      {
        source: { id: "bbc-news", name: "BBC News" },
        author: "BBC Reporter",
        title: "UK economy grows unexpectedly",
        description: "The UK economy grew more than expected in Q1 2024.",
        url: "https://bbc.com/news/economy",
        urlToImage: "https://bbc.com/images/economy.jpg",
        publishedAt: "2024-06-01T08:00:00Z",
        content: "Content...",
      },
      {
        source: { id: "the-guardian", name: "The Guardian" },
        author: "Guardian Staff",
        title: "London housing prices stabilise",
        description: "Housing prices in London have stabilised after a period of decline.",
        url: "https://theguardian.com/housing",
        urlToImage: null,
        publishedAt: "2024-06-01T07:30:00Z",
        content: "Content...",
      },
      {
        source: { id: null, name: "Independent" },
        author: null,
        title: "[Removed]",
        description: "[Removed]",
        url: "https://removed.com",
        urlToImage: null,
        publishedAt: null,
        content: "[Removed]",
      },
    ],
  },
};

describe("News API - Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── Successful requests ──────────────────────────────────────────────────────

  describe("GET /api/news - Successful Requests", () => {
    it("should return 200 with formatted news data for a valid country code", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=gb");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it("should include all required fields in the response", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=gb");

      expect(res.body.data).toHaveProperty("country", "GB");
      expect(res.body.data).toHaveProperty("totalResults");
      expect(res.body.data).toHaveProperty("articleCount");
      expect(res.body.data).toHaveProperty("articles");
      expect(Array.isArray(res.body.data.articles)).toBe(true);
    });

    it("should filter out [Removed] articles from the response", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=gb");

      // 3 total articles, 1 is [Removed] so only 2 should be returned
      expect(res.body.data.articleCount).toBe(2);
      const titles = res.body.data.articles.map((a) => a.title);
      expect(titles).not.toContain("[Removed]");
    });

    it("should uppercase the country code in the response", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=gb");

      expect(res.body.data.country).toBe("GB");
    });

    it("should accept uppercase country code and normalize it", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=US");

      expect(res.status).toBe(200);
      expect(res.body.data.country).toBe("US");
    });

    it("should call the NewsAPI with the correct country parameter", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      await request(app).get("/api/news?country=gb");

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("newsapi.org"),
        expect.objectContaining({
          params: expect.objectContaining({ country: "gb" }),
        })
      );
    });

    it("should return articles with all expected article fields", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=gb");

      const article = res.body.data.articles[0];
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("description");
      expect(article).toHaveProperty("source");
      expect(article).toHaveProperty("author");
      expect(article).toHaveProperty("url");
      expect(article).toHaveProperty("publishedAt");
      expect(article).toHaveProperty("imageUrl");
    });

    it("should return correct Content-Type header", async () => {
      axios.get.mockResolvedValueOnce(mockNewsApiSuccess);

      const res = await request(app).get("/api/news?country=us");

      expect(res.headers["content-type"]).toMatch(/application\/json/);
    });
  });

  // ── Validation errors ────────────────────────────────────────────────────────

  describe("GET /api/news - Missing/Invalid Country Parameter", () => {
    it("should return 400 when country query param is missing", async () => {
      const res = await request(app).get("/api/news");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/required/i);
      expect(axios.get).not.toHaveBeenCalled();
    });

    it("should return 400 for an empty country parameter", async () => {
      const res = await request(app).get("/api/news?country=");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 for a 3-letter country code (wrong format)", async () => {
      const res = await request(app).get("/api/news?country=usa");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/valid format/i);
    });

    it("should return 400 for an unsupported country code", async () => {
      const res = await request(app).get("/api/news?country=xx");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/not supported/i);
    });

    it("should return 400 for country code with numbers", async () => {
      const res = await request(app).get("/api/news?country=u1");

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ── External API errors ──────────────────────────────────────────────────────

  describe("GET /api/news - External API Error Handling", () => {
    it("should return error response when NewsAPI returns an error status in body", async () => {
      axios.get.mockResolvedValueOnce({
        data: {
          status: "error",
          code: "apiKeyInvalid",
          message: "Your API key is invalid.",
        },
      });

      const res = await request(app).get("/api/news?country=us");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should return 503 when there is a network failure", async () => {
      const networkError = new Error("Network Error");
      networkError.request = {};
      axios.get.mockRejectedValueOnce(networkError);

      const res = await request(app).get("/api/news?country=us");

      expect(res.status).toBe(503);
      expect(res.body.success).toBe(false);
    });

    it("should return 429 when NewsAPI rate limit is exceeded", async () => {
      const rateLimitError = new Error("Too Many Requests");
      rateLimitError.response = { status: 429 };
      axios.get.mockRejectedValueOnce(rateLimitError);

      const res = await request(app).get("/api/news?country=us");

      expect(res.status).toBe(429);
      expect(res.body.success).toBe(false);
    });
  });
});
