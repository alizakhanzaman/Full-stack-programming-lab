const express = require('express');
const router = express.Router();
// Cart is managed client-side (localStorage/cookies) and submitted with orders
// This route provides validation/price-check before checkout
const Product = require('../models/Product');

router.post('/validate', async (req, res) => {
  try {
    const { items } = req.body;
    const validatedItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `"${product.name}" only has ${product.stock} in stock`,
        });
      }
      validatedItems.push({
        product: product._id,
        name: product.name,
        image: product.mainImage,
        price: product.price,
        quantity: item.quantity,
      });
      total += product.price * item.quantity;
    }

    res.json({ success: true, data: { items: validatedItems, subtotal: total } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
