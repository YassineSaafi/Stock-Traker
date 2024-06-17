const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour le bon de réception
const BonReceptionSchema = new Schema({
    reference: { type: String, required: true }, // Référence du bon de réception
    fournisseur: { type: Schema.Types.ObjectId, ref: 'Fournisseur', required: true }, // Référence vers le fournisseur
    produits: [{
        produit: { type: Schema.Types.ObjectId, ref: 'Produit', required: true }, // Référence vers le produit reçu
        quantite: { type: Number, required: true }, // Quantité reçue du produit
    }],
    dateReception: { type: Date, default: Date.now }, // Date de réception du bon
    // Autres champs nécessaires comme l'utilisateur responsable, les commentaires, etc.
}, {
    timestamps: true // Ajoute automatiquement des timestamps de création et de mise à jour
});

// Création du modèle BonReception à partir du schéma
const BonReception = mongoose.model('BonReception', BonReceptionSchema);

module.exports = BonReception;
