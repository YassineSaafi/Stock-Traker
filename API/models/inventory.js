const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  SKU: { type: [String], required: true },
  category: { type: [String], required: true },
  quantity: { type: [Number], required: true },
  unitPrice: { type: [Number], required: true },
  receptionDate: { type: Date, required: true },
  lastUpdate: { type: Date, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
