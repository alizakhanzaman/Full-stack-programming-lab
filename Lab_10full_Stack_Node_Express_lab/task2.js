const express = require('express');
const app = express();

// Reusable template with fresh layout
const page = (title, message, activePage, extraContent="") => `
<html>
<head>
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #eef2f7; /* soft background */
      color: #333;
    }

    /* Header */
    nav {
      background: linear-gradient(90deg, #f9a8d4, #fcd34d, #6ee7b7); /* pastel pink-yellow-green */
      padding: 20px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    nav a {
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      transition: 0.3s;
      color: #222;
      background: rgba(255,255,255,0.7);
    }

    nav a:hover {
      background: #fff;
      transform: scale(1.05);
    }

    .active {
      background: #fff;
      border: 2px solid #222;
    }

    /* Layout */
    .container {
      max-width: 1000px;
      margin: 40px auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      padding: 0 20px;
    }

    .card {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    h1 {
      margin-bottom: 10px;
      color: #111;
    }

    p {
      color: #555;
      margin-bottom: 15px;
    }

    ul {
      list-style: square;
      padding-left: 20px;
    }
  </style>
</head>

<body>

  <nav>
    <a href="/home" class="${activePage === 'home' ? 'active' : ''}">Home</a>
    <a href="/about" class="${activePage === 'about' ? 'active' : ''}">About</a>
    <a href="/contact" class="${activePage === 'contact' ? 'active' : ''}">Contact</a>
  </nav>

  <div class="container">
    <div class="card">
      <h1>${title}</h1>
      <p>${message}</p>
    </div>
    ${extraContent}
  </div>

</body>
</html>
`;

// Routes with different layouts
app.get('/', (req, res) => {
  res.send(page("Welcome", "Use the navigation buttons above", ""));
});

app.get('/home', (req, res) => {
  res.send(page("Home Page", "Welcome Home", "home", `
    <div class="card">
      <h2>Lab Activities</h2>
      <ul>
        <li>Testing sensors</li>
        <li>Building circuits</li>
        <li>Analyzing data</li>
      </ul>
    </div>
  `));
});

app.get('/about', (req, res) => {
  res.send(page("About Page", "Learn more about us", "about", `
    <div class="card">
      <h2>Our Vision</h2>
      <p>We strive to innovate in technology and science labs, making learning interactive and fun.</p>
    </div>
  `));
});

app.get('/contact', (req, res) => {
  res.send(page("Contact Page", "Reach out to us", "contact", `
    <div class="card">
      <h2>Contact Info</h2>
      <ul>
        <li>Email: lab@example.com</li>
        <li>Phone: +92-300-1234567</li>
        <li>Location: XYZ University</li>
      </ul>
    </div>
  `));
});

// Server
app.listen(3000, () => {
  console.log("Task 2 running at http://localhost:3000");
});