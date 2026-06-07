const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // STEP 1: Check if request has a token in the header
  // Header looks like: "Authorization: Bearer eyJhbGci..."
  if (req.headers.authorization?.startsWith("Bearer")) {
    try 
    {
      // STEP 2: Extract the token (remove "Bearer " prefix)
      token = req.headers.authorization.split(" ")[1];

      // STEP 3: Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded = { id: "64abc123...", iat: ..., exp: ... }

      // STEP 4: Find the user in database by ID and attach to req object (for use in route handlers)
      req.user = await User.findById(decoded.id).select("-password");
      // "-password" means: give everything EXCEPT the password
      next(); //Token is valid, allow the request to continue to the protected route
    } catch {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = { protect };