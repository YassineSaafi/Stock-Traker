const mongoose = require('mongoose');

const DevisSchema = new mongoose.Schema({
  num: { type: String, required: true },
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  produits: [
    {
      idProduit: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      ref: { type: String, required: true },
      nom: { type: String, required: true },
      prix: { type: Number, required: true },
      qte: { type: Number, required: true }
    }
  ],
  somme: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Devis', DevisSchema);
