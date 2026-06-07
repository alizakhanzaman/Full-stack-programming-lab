const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  // STEP 1: Check if all fields are filled
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // STEP 2: Check if email already exists in database
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // STEP 3: HASH the password (never save plain text password!)
  // "10" means how many times to scramble it — more = more secure but slower
  const hashedPassword = await bcrypt.hash(password, 10);
  // STEP 4: Save user to MongoDB
  const user = await User.create({ name, email, password: hashedPassword });

  // STEP 5: Send back user info + JWT token
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // STEP 1: Find user in database by email
  const user = await User.findOne({ email });

  // STEP 2: Compare typed password with the stored hash
  // bcrypt.compare() does the magic — it hashes the typed password
  // and checks if it matches the stored hash
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // give new token on each login
    });
  }
   else  // Wrong email or password
  {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};