const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const Product = require('./models/Product');

console.log('MONGO_URI:', process.env.MONGO_URI); // debug line

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected!');

    await Product.deleteMany();

    await Product.insertMany([
      {
        name: 'Nike Running Shoes',
        price: 4500,
        description: 'Lightweight and comfortable',
        category: 'Footwear',
        image: 'https://via.placeholder.com/300x200?text=Nike+Shoes'
      },
      {
        name: 'Wireless Headphones',
        price: 3200,
        description: 'Noise-cancelling headphones',
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200?text=Headphones'
      },
      {
        name: 'Casual T-Shirt',
        price: 850,
        description: '100% cotton t-shirt',
        category: 'Clothing',
        image: 'https://via.placeholder.com/300x200?text=T-Shirt'
      },
      {
        name: 'Laptop Backpack',
        price: 1800,
        description: 'Water-resistant laptop bag',
        category: 'Accessories',
        image: 'https://via.placeholder.com/300x200?text=Backpack'
      }
    ]);

    console.log('✅ Sample products inserted!');
    process.exit();
  })
  .catch(err => {
    console.log('❌ Error:', err);
    process.exit(1);
  });