const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    role: {
        type: String,
        enum: ['superAdmin', 'Responsable de vente', 'Responsable d’achat et de Stock', 'Responsable de finance et comptabilité'],
        default: 'Responsable de vente'
    }
});

module.exports = mongoose.model('User', userSchema);
