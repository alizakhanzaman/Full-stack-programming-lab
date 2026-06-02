// tests/system/newsEndpoint.test.js
// System tests for the News Headlines API
// Tests the complete request-to-response pipeline including routing,
// validation, service layer, formatting, and error middleware.

const request = require("supertest");
const app = require("../../app");

jest.mock("axios");
const axios = require("axios");

// Builder for a realistic NewsAPI response
const buildNewsResponse = (articleCount = 3, overrides = {}) => {
  const articles = Array.from({ length: articleCount }, (_, i) => ({
    source: { id: `source-${i}`, name: `News Source ${i + 1}` },
    author: `Author ${i + 1}`,
    title: `Breaking News Headline ${i + 1}`,
    description: `Summary of news story ${i + 1}.`,
    url: `https://example-news.com/article-${i + 1}`,
    urlToImage: i % 2 === 0 ? `https://example-news.com/img-${i + 1}.jpg` : null,
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content: `Full content of article ${i + 1}.`,
  }));

  return {
    data: {
      status: "ok",
      totalResults: articleCount,
      articles,
      ...overrides,
    },
  };
};

describe("News API - System Tests (End-to-End Pipeline)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── Route existence ──────────────────────────────────────────────────────────

  it("GET /api/news should exist and return JSON", async () => {
    axios.get.mockResolvedValueOnce(buildNewsResponse());
    const res = await request(app).get("/api/news?country=us");
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should return a response with a 'success' boolean field at the top level", async () => {
    axios.get.mockResolvedValueOnce(buildNewsResponse());
    const res = await request(app).get("/api/news?country=us");
    expect(typeof res.body.success).toBe("boolean");
  });

  // ── Full successful pipeline ─────────────────────────────────────────────────

  it("should complete the full pipeline and return 200 with all data fields", async () => {
    axios.get.mockResolvedValueOnce(buildNewsResponse(5));
    const res = await request(app).get("/api/news?country=us");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const { data } = res.body;
    expect(data.country).toBe("US");
    expect(data.totalResults).toBe(5);
    expect(data.articleCount).toBe(5);
    expect(data.articles).toHaveLength(5);
  });

  it("should correctly format each article in the response", async () => {
    axios.get.mockResolvedValueOnce(buildNewsResponse(2));
    const res = await request(app).get("/api/news?country=au");

    const article = res.body.data.articles[0];
    expect(article).toHaveProperty("title");
    expect(article).toHaveProperty("description");
    expect(article).toHaveProperty("source");
    expect(article).toHaveProperty("author");
    expect(article).toHaveProperty("url");
    expect(article).toHaveProperty("publishedAt");
    expect(article).toHaveProperty("imageUrl");
  });

  it("should return country code in uppercase regardless of input case", async () => {
    axios.get.mockResolvedValueOnce(buildNewsResponse(1));
    const res = await request(app).get("/api/news?country=AU");

    expect(res.body.data.country).toBe("AU");
  });

  it("should filter [Removed] articles in the full pipeline", async () => {
    const responseWithRemoved = {
      data: {
        status: "ok",
        totalResults: 4,
        articles: [
          { source: { name: "BBC" }, title: "Real Article", description: "Desc", author: "A", url: "https://bbc.com", urlToImage: null, publishedAt: new Date().toISOString() },
          { source: { name: "N/A" }, title: "[Removed]", description: "[Removed]", author: null, url: "https://removed.com", urlToImage: null, publishedAt: null },
        ],
      },
    };
    axios.get.mockResolvedValueOnce(responseWithRemoved);

    const res = await request(app).get("/api/news?country=gb");

    expect(res.body.data.articleCount).toBe(1);
    expect(res.body.data.articles[0].title).toBe("Real Article");
  });

  // ── Validation layer ─────────────────────────────────────────────────────────

  it("should block missing country parameter at validation before hitting service", async () => {
    const res = await request(app).get("/api/news");
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it("should block unsupported country code at validation layer", async () => {
    const res = await request(app).get("/api/news?country=xx");
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it("should block 3-letter country code with correct error message", async () => {
    const res = await request(app).get("/api/news?country=usa");
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/valid format/i);
  });

  // ── Service error propagation ────────────────────────────────────────────────

  it("should propagate 401 (invalid API key) through the full pipeline", async () => {
    axios.get.mockResolvedValueOnce({
      data: { status: "error", code: "apiKeyInvalid", message: "Your API key is invalid." },
    });

    const res = await request(app).get("/api/news?country=us");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should handle network failure through full error pipeline", async () => {
    const err = new Error("Network Error");
    err.request = {};
    axios.get.mockRejectedValueOnce(err);

    const res = await request(app).get("/api/news?country=ca");

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
  });

  it("should return 429 for rate limit errors in full pipeline", async () => {
    const err = new Error("Too Many Requests");
    err.response = { status: 429 };
    axios.get.mockRejectedValueOnce(err);

    const res = await request(app).get("/api/news?country=de");

    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
  });

  // ── Empty response handling ──────────────────────────────────────────────────

  it("should handle NewsAPI returning 0 articles gracefully", async () => {
    axios.get.mockResolvedValueOnce({
      data: { status: "ok", totalResults: 0, articles: [] },
    });

    const res = await request(app).get("/api/news?country=us");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.articleCount).toBe(0);
    expect(res.body.data.articles).toHaveLength(0);
  });
});
