const mongoose = require('mongoose');
const Cheque = require('../models/ChequeModel');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier enregistré
    }
});

// Initialiser Multer avec la configuration
const upload = multer({ storage: storage });

// Méthode pour ajouter un chèque avec copie de chèque
exports.addCheque = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { numboedereau, client, date, banque, montant, etat } = req.body;

       
        if (!mongoose.Types.ObjectId.isValid(client)) {
            console.error('Invalid Client ID:', client);
            return res.status(400).json({ error: 'Client ID is not a valid ObjectId' });
        }

        // Create new cheque
        const newCheque = new Cheque({
            numboedereau,
            client: new mongoose.Types.ObjectId(client),
            date,
            copie: req.file ? req.file.path : '',
            banque,
            montant,
            etat
        });

        console.log('New Cheque Data:', newCheque);

        const savedCheque = await newCheque.save();
        res.status(201).json(savedCheque);
    } catch (error) {
        console.error('Error adding cheque:', error);
        res.status(500).json({ error: 'An error occurred while adding the cheque' });
    }
};

// Other methods...


exports.getAllCheques = async (req, res) => {
    try {
        const cheques = await Cheque.find().populate('client');
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour supprimer un chèque par ID
exports.deleteCheque = async (req, res) => {
    try {
        await Cheque.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Le chèque a été supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour rechercher des chèques par date
exports.getChequesByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const cheques = await Cheque.find({ date: { $gte: new Date(date) } }).populate('client');
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour rechercher des chèques par client
exports.getChequesByClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const cheques = await Cheque.find({ client: clientId }).populate('client');
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour rechercher des chèques par état (versé ou non versé)
exports.getChequesByEtat = async (req, res) => {
    try {
        const etat = req.params.etat;
        const cheques = await Cheque.find({ etat: etat }).populate('client');
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    module.exports = {
        addCheque,
        getAllCheques,
        deleteCheque,
        getChequesByDate,
        getChequesByClient,
        getChequesByEtat
    };
};
