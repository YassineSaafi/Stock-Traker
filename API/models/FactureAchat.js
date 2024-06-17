const mongoose = require('mongoose');
require('./supplierModel');

const FactureAchatSchema = new mongoose.Schema({
    reference: { type: String, required: true },
    fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
    date: { type: Date, required: true },
    copie: { type: String },
    montant: { type: Number, required: true },
});

module.exports = mongoose.model('FactureAchat', FactureAchatSchema);
