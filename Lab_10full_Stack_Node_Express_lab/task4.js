const express = require('express');
const app = express();

app.get('/', (req, res) => {

  res.send(`
    <html>
    <head>
      <title>Aliza's Knowledge Hub</title>

      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #2b2d42; /* deep charcoal */
          color: #edf2f4;      /* soft light text */
        }

        /* Header */
        header {
          background: #1d3557; /* dark blue-gray */
          padding: 20px;
          text-align: center;
          color: #f1faee;
        }

        header h1 {
          margin: 0;
          font-size: 34px;
          letter-spacing: 1px;
        }

        /* Intro Section */
        .intro {
          text-align: center;
          padding: 60px 20px;
        }

        .intro h2 {
          font-size: 26px;
          margin-bottom: 15px;
          color: #a8dadc; /* aqua accent */
        }

        .intro p {
          font-size: 18px;
          color: #edf2f4;
        }

        /* List Section */
        .topics {
          background: #3a3d5c;
          margin: 40px auto;
          padding: 30px;
          border-radius: 12px;
          width: 65%;
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }

        .topics h3 {
          margin-bottom: 15px;
          color: #ffb703; /* warm amber accent */
        }

        ul {
          list-style: square;
          padding-left: 25px;
          font-size: 16px;
          color: #f1faee;
        }

        li {
          margin: 8px 0;
        }

        /* Footer */
        footer {
          text-align: center;
          padding: 15px;
          background: #1d3557;
          color: #a8dadc;
        }
      </style>
    </head>

    <body>

      <!-- Header -->
      <header>
        <h1>Aliza Zaman's Knowledge Hub</h1>
      </header>

      <!-- Intro -->
      <section class="intro">
        <h2>Welcome!</h2>
        <p>This page highlights my interests in technology and continuous learning 🌌</p>
      </section>

      <!-- Topics List -->
      <section class="topics">
        <h3>Areas I'm Exploring</h3>
        <ul>
          <li>Artificial Intelligence</li>
          <li>Web Development</li>
          <li>Cybersecurity</li>
          <li>Data Science</li>
          <li>Cloud Computing</li>
        </ul>
      </section>

      <!-- Footer -->
      <footer>
        <p>© 2026 Aliza Zaman | Keep Learning, Keep Growing</p>
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 4 running at http://localhost:3000");
});