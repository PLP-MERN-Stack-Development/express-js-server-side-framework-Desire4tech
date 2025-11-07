// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Products');
const router = express.Router();

// ✅ Validation middleware
function validateProduct(req, res, next) {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: 'Product name and price are required' });
  }
  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number' });
  }
  next();
}

// ✅ GET all products (with filter, search, pagination)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 5 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);
    res.json({ total, page: Number(page), data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  GET one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new product
router.post('/', validateProduct, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  PUT update product
// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  GET product statistics (count by category)
router.get('/stats/category', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
