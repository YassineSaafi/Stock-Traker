const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChequeSchema = new Schema({
    numboedereau: { type: String, required: true }, // Numéro de bordereau du chèque
    client: { type: Schema.Types.ObjectId }, // Référence à l'ID du client (ObjectId)
    date: { type: Date }, // Date du chèque
    copie: { type: String }, // Chemin vers l'image (à gérer avec multer)
    banque: { type: String }, // Banque émettrice du chèque
    montant: { type: Number, required: true }, // Montant du chèque
    etat: { type: String, enum: ['versé', 'nonversé'], default: 'nonversé' } 
 
});

module.exports = mongoose.model('Cheque', ChequeSchema);
