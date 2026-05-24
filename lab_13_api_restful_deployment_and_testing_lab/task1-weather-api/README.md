# Lab 13 – Task 1: Weather Forecast API

A RESTful API built with **Node.js** and **Express.js** that fetches real-time weather data
from the [OpenWeatherMap API](https://openweathermap.org/api).

---

## Project Structure

```
task1-weather-api/
├── server.js                        ← Entry point
├── package.json
├── .env                             ← API key goes here
└── src/
    ├── routes/
    │   └── weatherRoutes.js         ← URL definitions
    ├── controllers/
    │   └── weatherController.js     ← Request/response logic
    └── services/
        └── weatherService.js        ← OpenWeather API calls
```

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Open `.env` and replace `your_openweather_api_key_here`:
```
OPENWEATHER_API_KEY=abc123yourkeyhere
PORT=5000
```
Get a **free** key at https://openweathermap.org/ (takes ~2 minutes).

### 3. Start the server
```bash
npm start          # production
npm run dev        # development (auto-restart with nodemon)
```

---

## API Endpoints

### Get Current Weather
```
GET /api/weather/:city
```
**Example:**
```
http://localhost:5000/api/weather/Karachi
http://localhost:5000/api/weather/London
http://localhost:5000/api/weather/New%20York
```
**Response:**
```json
{
  "success": true,
  "data": {
    "city": "Karachi",
    "country": "PK",
    "temperature": {
      "current": 32.5,
      "feelsLike": 36.1,
      "min": 30.0,
      "max": 34.0,
      "unit": "Celsius"
    },
    "condition": {
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "https://openweathermap.org/img/wn/03d@2x.png"
    },
    "humidity": "70%",
    "windSpeed": "5.1 m/s",
    "visibility": "10 km",
    "pressure": "1008 hPa",
    "sunrise": "5:42:00 AM",
    "sunset": "7:03:00 PM",
    "fetchedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get 5-Day Forecast
```
GET /api/weather/:city/forecast
```
**Example:**
```
http://localhost:5000/api/weather/Islamabad/forecast
```

---

## Error Responses

| Scenario | HTTP Status | Response |
|---|---|---|
| City not found | 404 | `{ "success": false, "error": "City \"xyz\" not found" }` |
| Invalid API key | 401 | `{ "success": false, "error": "Invalid API key" }` |
| Rate limit hit | 429 | `{ "success": false, "error": "API rate limit exceeded" }` |
| Network issue | 503 | `{ "success": false, "error": "Cannot reach weather service" }` |

---

## Testing with Postman

1. Open Postman → New Request
2. Method: **GET**
3. URL: `http://localhost:5000/api/weather/Lahore`
4. Click **Send**

Or test directly in the browser:
- http://localhost:5000/api/weather/Karachi
- http://localhost:5000/api/weather/Dubai/forecast
