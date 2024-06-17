const mongoose = require('mongoose');

const BonDeLivraisonSchema = new mongoose.Schema({
  num: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  produits: [{
    idProduit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nom: String,
    qte: {
      type: Number,
      required: true
    },
    prix: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BonDeLivraison', BonDeLivraisonSchema);
