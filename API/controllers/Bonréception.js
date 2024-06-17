const BonReception = require('../models/Bonréception');

// Méthode pour créer un bon de réception
exports.createBonReception = async (req, res) => {
    try {
        const { reference, fournisseur, produits } = req.body;
        const newBonReception = new BonReception({ reference, fournisseur, produits });
        const savedBonReception = await newBonReception.save();
        res.status(201).json(savedBonReception);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour récupérer tous les bons de réception
exports.getAllBonReceptions = async (req, res) => {
    try {
        const bonReceptions = await BonReception.find();
        res.json(bonReceptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour récupérer un bon de réception par son ID
exports.getBonReceptionById = async (req, res) => {
    try {
        const bonReception = await BonReception.findById(req.params.id);
        if (!bonReception) {
            return res.status(404).json({ message: 'Bon de réception non trouvé' });
        }
        res.json(bonReception);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour mettre à jour un bon de réception existant
exports.updateBonReception = async (req, res) => {
    try {
        const updatedBonReception = await BonReception.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBonReception);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour supprimer un bon de réception
exports.deleteBonReception = async (req, res) => {
    try {
        await BonReception.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bon de réception supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
