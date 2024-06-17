
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  id: { type: String },
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: true },
  matricule: { type: String } // Optionnel
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
