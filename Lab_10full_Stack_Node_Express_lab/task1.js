const express = require('express');
const app = express();

// Updated Student Data
const students = [
  "Aliza Zaman",
  "Sarosh Majeed",
  "Urwa Kashaf",
  "Laiba Hamid"
];

app.get('/', (req, res) => {

  const list = students.map(s => `<li>${s}</li>`).join("");

  res.send(`
    <html>
    <head>
      <title>Student List</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f0f4ff, #c2e9fb);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          background: #ffffff;
          padding: 30px;
          border-radius: 15px;
          width: 380px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          color: #2a4d69;
        }

        ul {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        li {
          background: #eaf6ff;
          padding: 12px;
          border-radius: 8px;
          font-weight: 500;
          transition: 0.3s;
          color: #2a4d69;
        }

        li:hover {
          background: #4a90e2;
          color: #fff;
          transform: translateY(-3px);
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h2>🎓 Student List</h2>
        <ul>
          ${list}
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 1 running at http://localhost:3000");
});