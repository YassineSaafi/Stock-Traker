const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ref: { type: String, required: true },
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  qte: { type: Number, default: 0 },
  categorieNom: { type: String } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
