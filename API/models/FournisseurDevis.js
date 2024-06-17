// models/FournisseurDevis.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FournisseurDevisSchema = new Schema({
  reference: { type: String, required: true },
  fournisseur: { type: Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
  produits: [
    {
      produit: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Utilisation de 'Product'
      quantite: { type: Number, required: true },
      prixUnitaire: { type: Number, required: true }
    }
  ],
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('FournisseurDevis', FournisseurDevisSchema);
