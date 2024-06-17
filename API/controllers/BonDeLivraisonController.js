const BonDeLivraison = require('../models/BonDeLivraisonModel');
const Product = require('../models/productModel');
const Client = require('../models/clientModel');

exports.createBonDeLivraison = async (req, res) => {
  try {
    if (req.body._id === '') {
      delete req.body._id;
    }

    const newBonDeLivraison = new BonDeLivraison(req.body);
    const validationError = newBonDeLivraison.validateSync();
    if (validationError) {
      throw validationError;
    }

    await newBonDeLivraison.save();
    res.status(201).json(newBonDeLivraison);
  } catch (error) {
    console.error(`Erreur lors de la création du Bon de Livraison: ${error}`);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation Error', details: errors });
    } else {
      res.status(500).json({ error: 'Erreur lors de la création du Bon de Livraison.', details: error.message });
    }
  }
};

exports.updateBonDeLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const bonDeLivraison = await BonDeLivraison.findByIdAndUpdate(id, req.body, { new: true });
    if (!bonDeLivraison) {
      return res.status(404).json({ message: 'Bon de Livraison non trouvé' });
    }
    res.status(200).json(bonDeLivraison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBonDeLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const bonDeLivraison = await BonDeLivraison.findByIdAndDelete(id);
    if (!bonDeLivraison) {
      return res.status(404).json({ message: 'Bon de Livraison non trouvé' });
    }
    res.status(200).json({ message: 'Bon de Livraison supprimé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBonDeLivraisonById = async (req, res) => {
  try {
    const { id } = req.params;
    const bonDeLivraison = await BonDeLivraison.findById(id).populate('client').populate('produits.idProduit');
    if (!bonDeLivraison) {
      return res.status(404).json({ message: 'Bon de Livraison non trouvé' });
    }
    res.status(200).json(bonDeLivraison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBonsDeLivraisonByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const bonsDeLivraison = await BonDeLivraison.find({ client: clientId });
    res.status(200).json(bonsDeLivraison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBonsDeLivraison = async (req, res) => {
  try {
    const bonsDeLivraison = await BonDeLivraison.find();
    res.status(200).json(bonsDeLivraison);
  } catch (error) {
    console.error(`Erreur lors de la récupération des Bons de Livraison : ${error}`);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des Bons de Livraison.' });
  }
};
