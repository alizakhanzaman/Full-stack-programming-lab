const jwt = require("jsonwebtoken");

// Generates a signed JWT token containing the user's ID.
// Called after successful login and registration.
// Token expires in 7 days — user stays logged in without re-entering credentials.

const generateToken = (id) =>
  jwt.sign(
    { id },                      // payload: stores the user's MongoDB _id
    process.env.JWT_SECRET,      // secret key from .env — never hardcode this
    { expiresIn: "7d" }          // token validity — 7 days
  );

module.exports = generateToken;