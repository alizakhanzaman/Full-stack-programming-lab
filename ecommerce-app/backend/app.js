const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Manually load .env
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to:', MONGO_URI); // debug line

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected!'))
  .catch(err => console.log('❌ Error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('🛒 Ecommerce Backend Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});