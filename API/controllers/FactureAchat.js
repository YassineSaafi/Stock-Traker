const mongoose = require('mongoose');
const FactureAchat = require('../models/FactureAchat');
const fournisseur = require('../models/supplierModel');

// Méthode pour ajouter une facture d'achat avec copie
exports.addFactureAchat = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { reference, fournisseur, date, copie, montant } = req.body;

        // Validate fournisseur ID
        if (!mongoose.Types.ObjectId.isValid(fournisseur)) {
            console.error('Invalid Fournisseur ID:', fournisseur);
            return res.status(400).json({ error: 'Fournisseur ID is not a valid ObjectId' });
        }

        // Create new Facture Achat
        const newFactureAchat = new FactureAchat({
            reference,
            fournisseur: new mongoose.Types.ObjectId(fournisseur),
            date,
            copie: copie,
            montant
        });

        console.log('New Facture Achat Data:', newFactureAchat);

        const savedFactureAchat = await newFactureAchat.save();
        res.status(201).json(savedFactureAchat);
    } catch (error) {
        console.error('Error adding Facture Achat:', error);
        res.status(500).json({ error: 'An error occurred while adding the Facture Achat' });
    }
};



exports.getAllFacturesAchat = async (req, res) => {
    try {
        const invoices = await FactureAchat.find().populate('fournisseur', 'nom');
        res.status(200).json(invoices);
    } catch (error) {
        console.error(`Erreur lors de la récupération des factures : ${error}`);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des factures.' });
    }
};


