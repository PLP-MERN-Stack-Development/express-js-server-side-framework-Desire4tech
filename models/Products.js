const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    category: {type: String, required: true},
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Convert `_id` to `id` in JSON output (optional for cleaner look)
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, obj) => {
      obj.id = obj._id;  // rename _id → id
      delete obj._id;    // remove the original _id field
    }
  });

module.exports = mongoose.model('Product', productSchema);
