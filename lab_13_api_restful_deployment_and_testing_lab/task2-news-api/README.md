# Lab 13 – Task 2: News Headlines API

A RESTful API built with **Node.js** and **Express.js** that fetches the latest news headlines
from [NewsAPI.org](https://newsapi.org/).

---

## Project Structure

```
task2-news-api/
├── server.js                        ← Entry point
├── package.json
├── .env                             ← API key goes here
└── src/
    ├── routes/
    │   └── newsRoutes.js            ← URL definitions
    ├── controllers/
    │   └── newsController.js        ← Request/response logic
    └── services/
        └── newsService.js           ← NewsAPI.org calls
```

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Open `.env` and replace `your_newsapi_key_here`:
```
NEWS_API_KEY=abc123yourkeyhere
PORT=6000
```
Get a **free** key at https://newsapi.org/ (free plan: 100 requests/day).

### 3. Start the server
```bash
npm start          # production
npm run dev        # development (auto-restart with nodemon)
```

---

## API Endpoints

### Get Top Headlines by Country
```
GET /api/news/:country
```
**Parameters:**
- `country` — 2-letter ISO country code (e.g., `pk`, `us`, `gb`, `in`, `ae`)
- `?limit=5` — (optional) number of articles, max 10

**Example:**
```
http://localhost:6000/api/news/pk
http://localhost:6000/api/news/us?limit=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "country": "PK",
    "totalResults": 38,
    "articlesReturned": 10,
    "articles": [
      {
        "title": "Pakistan wins series against...",
        "source": "Dawn",
        "url": "https://dawn.com/...",
        "publishedAt": "1/15/2024, 3:30:00 PM",
        "description": "A brief description of the article.",
        "author": "Staff Reporter"
      }
    ],
    "fetchedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Get Headlines by Country & Category
```
GET /api/news/:country/category/:category
```
**Valid categories:** `business`, `entertainment`, `general`, `health`, `science`, `sports`, `technology`

**Example:**
```
http://localhost:6000/api/news/us/category/technology
http://localhost:6000/api/news/pk/category/sports
```

---

### Search News by Keyword
```
GET /api/news/search/:keyword
```
**Example:**
```
http://localhost:6000/api/news/search/cricket
http://localhost:6000/api/news/search/AI?limit=5
```

---

## Valid Country Codes

| Code | Country       | Code | Country        |
|------|---------------|------|----------------|
| pk   | Pakistan      | us   | United States  |
| gb   | United Kingdom| in   | India          |
| ae   | UAE           | sa   | Saudi Arabia   |
| au   | Australia     | ca   | Canada         |
| de   | Germany       | fr   | France         |
| jp   | Japan         | cn   | China          |

Full list: ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr,
hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pk,
pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za

---

## Error Responses

| Scenario | HTTP Status | Response |
|---|---|---|
| Invalid country code | 400 | `{ "success": false, "error": "Invalid country code: \"xyz\"" }` |
| Invalid category | 400 | `{ "success": false, "error": "Invalid category: \"xyz\"" }` |
| Invalid API key | 401 | `{ "success": false, "error": "Invalid or missing NEWS_API_KEY" }` |
| Rate limit hit (100/day) | 429 | `{ "success": false, "error": "News API rate limit exceeded" }` |
| Network issue | 503 | `{ "success": false, "error": "Cannot reach News API service" }` |

---

## Testing with Postman

1. Open Postman → New Request
2. Method: **GET**
3. URL: `http://localhost:6000/api/news/pk`
4. Click **Send**

Browser test URLs:
- http://localhost:6000/api/news/pk
- http://localhost:6000/api/news/us/category/technology
- http://localhost:6000/api/news/search/cricket
