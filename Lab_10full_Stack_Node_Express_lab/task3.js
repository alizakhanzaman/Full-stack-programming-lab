const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Dynamic User</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #ffecd2, #fcb69f); /* peach gradient */
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .box {
            text-align: center;
            background: rgba(255,255,255,0.8);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
          a {
            color: #e63946;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>Dynamic User Page</h2>
          <p>Try:</p>
          <a href="/user/Aliza">/user/Aliza</a>
        </div>
      </body>
    </html>
  `);
});

app.get('/user/:name', (req, res) => {
  const name = req.params.name;

  res.send(`
    <html>
    <head>
      <title>User Profile</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb); /* soft blue gradient */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #333;
        }

        .profile-card {
          background: #fff;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          width: 360px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          font-weight: bold;
          margin: 0 auto 20px;
          color: #fff;
        }

        h1 {
          margin: 10px 0;
          color: #222;
        }

        p {
          color: #555;
        }

        .btn {
          margin-top: 20px;
          display: inline-block;
          padding: 12px 24px;
          border-radius: 30px;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: white;
          text-decoration: none;
          transition: 0.3s;
          font-weight: bold;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(255,118,136,0.6);
        }
      </style>
    </head>

    <body>
      <div class="profile-card">
        <div class="avatar">
          ${name.charAt(0).toUpperCase()}
        </div>
        <h1>Hello, ${name}</h1>
        <p>Welcome to your personalized profile page 🌸</p>
        <a href="/" class="btn">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 3 running at http://localhost:3000");
});