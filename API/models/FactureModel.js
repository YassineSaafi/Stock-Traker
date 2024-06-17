const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');

const invoiceSchema = new Schema({
  num: { type: String, required: true },
  client: { type: String, required: true },
  adresse: { type: String, required: true },
  produits: [{
    idProduit: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    ref: { type: String, required: true }, // Assurez-vous que ref est défini comme requis
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    qte: { type: Number, required: true }
  }],
  somme: { type: Number, required: true },
  paiement: { type: String, enum: ['espèces', 'chèque', 'virement'], required: true },
  date: { type: Date, default: Date.now },
  validation: { type: Boolean, default: false }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
