require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rustik_plank';

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  console.log('Cleared existing data');

  const categories = await Category.insertMany([
    { name: 'Chairs', slug: 'chairs', description: 'Handcrafted wooden chairs' },
    { name: 'Tables', slug: 'tables', description: 'Reclaimed wood tables' },
    { name: 'Beds', slug: 'beds', description: 'Rustic solid wood beds' },
    { name: 'Bookcases', slug: 'bookcases', description: 'Handmade bookcases & shelves' },
    { name: 'Cabinets', slug: 'cabinets', description: 'Storage & display cabinets' },
    { name: 'Boxes', slug: 'boxes', description: 'Decorative wooden boxes' },
  ]);

  const [chairs, tables, beds, bookcases, cabinets, boxes] = categories;
  console.log('Categories seeded');

  const productData = [
    { name: 'Artisan Lounge Chair', slug: slugify('Artisan Lounge Chair'), category: chairs._id, price: 134.99, originalPrice: 189.99, stock: 10, isFeatured: true, isPopular: true, material: 'Reclaimed Oak', color: 'Natural Wood', description: 'Hand-crafted lounge chair made from reclaimed oak. Each piece is unique with natural wood grain patterns.', shortDescription: 'Handmade reclaimed oak lounge chair', mainImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
    { name: 'Rustic Dining Chair', slug: slugify('Rustic Dining Chair'), category: chairs._id, price: 89.99, originalPrice: 119.99, stock: 25, isPopular: true, material: 'Pine Wood', color: 'Walnut Stain', description: 'Classic dining chair with sturdy pine construction and walnut stain finish.', shortDescription: 'Pine dining chair with walnut stain', mainImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80' },
    { name: 'Reclaimed Wood Table', slug: slugify('Reclaimed Wood Table'), category: tables._id, price: 299.99, originalPrice: 399.99, stock: 5, isFeatured: true, isSpecial: true, material: 'Reclaimed Teak', color: 'Dark Brown', description: 'Large dining table crafted from 100% reclaimed teak wood. Seats 8 comfortably.', shortDescription: 'Large reclaimed teak dining table', mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { name: 'Coffee Table', slug: slugify('Coffee Table'), category: tables._id, price: 149.99, stock: 12, isPopular: true, material: 'Solid Oak', color: 'Natural', description: 'Low-profile coffee table with solid oak construction and natural finish.', shortDescription: 'Solid oak coffee table', mainImage: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&q=80' },
    { name: 'King Size Bed Frame', slug: slugify('King Size Bed Frame'), category: beds._id, price: 499.99, originalPrice: 649.99, stock: 4, isFeatured: true, isSpecial: true, material: 'Solid Walnut', color: 'Dark Walnut', description: 'Luxurious king size bed frame handmade from solid walnut with a high headboard.', shortDescription: 'King size solid walnut bed frame', mainImage: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80' },
    { name: 'Rustic Bookcase', slug: slugify('Rustic Bookcase'), category: bookcases._id, price: 219.99, stock: 8, isPopular: true, material: 'Pine & Oak', color: 'Honey Oak', description: '5-shelf bookcase with pine frame and solid oak shelves.', shortDescription: 'Industrial style pine and oak bookcase', mainImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: 'Storage Cabinet', slug: slugify('Storage Cabinet'), category: cabinets._id, price: 349.99, originalPrice: 449.99, stock: 6, isSpecial: true, material: 'Reclaimed Elm', color: 'Weathered Grey', description: 'Large storage cabinet made from reclaimed elm with iron handles and hinges.', shortDescription: 'Reclaimed elm storage cabinet', mainImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80' },
    { name: 'Decorative Box Set', slug: slugify('Decorative Box Set'), category: boxes._id, price: 39.99, stock: 30, isPopular: true, material: 'Mango Wood', color: 'Natural', description: 'Set of 3 nesting decorative boxes made from mango wood with hand-painted designs.', shortDescription: 'Mango wood decorative box set of 3', mainImage: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&q=80' },
    { name: 'Accent Chair', slug: slugify('Accent Chair'), category: chairs._id, price: 164.99, stock: 9, isFeatured: true, material: 'Ash Wood', color: 'Light Ash', description: 'Elegant accent chair with sculptural ash wood frame and woven seat.', shortDescription: 'Sculptural ash wood accent chair', mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
    { name: 'Side Table', slug: slugify('Side Table'), category: tables._id, price: 79.99, originalPrice: 99.99, stock: 20, isSpecial: true, material: 'Cherry Wood', color: 'Cherry', description: 'Small side table with drawer and lower shelf in cherry wood.', shortDescription: 'Cherry wood side table with drawer', mainImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80' },
    { name: 'Twin Bed Frame', slug: slugify('Twin Bed Frame'), category: beds._id, price: 279.99, stock: 7, material: 'Pine', color: 'Natural Pine', description: 'Sturdy twin bed frame in natural pine with slatted headboard design.', shortDescription: 'Natural pine twin bed frame', mainImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80' },
    { name: 'Wall Shelf Unit', slug: slugify('Wall Shelf Unit'), category: bookcases._id, price: 129.99, stock: 15, isFeatured: true, material: 'Reclaimed Oak', color: 'Aged Oak', description: 'Floating wall shelf unit from reclaimed oak. Set of 3 shelves with industrial brackets.', shortDescription: 'Reclaimed oak floating wall shelves', mainImage: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80' },
  ];

  await Product.insertMany(productData);
  console.log('Products seeded');

  await User.create({ name: 'Admin User', email: 'admin@rustikplank.com', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Test User', email: 'user@rustikplank.com', password: 'user123', role: 'user' });
  console.log('Users seeded');

  console.log('✅ Seed complete!');
  console.log('Admin: admin@rustikplank.com / admin123');
  console.log('User:  user@rustikplank.com / user123');

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});