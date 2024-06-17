const Devis = require('../models/DevisModel');
const mongoose = require('mongoose');

exports.createDevis = async (req, res) => {
  try {
    const generateDevisNumber = () => {
      return 'DEV-' + Date.now();
    };

    const newDevis = new Devis({
      ...req.body,
      num: generateDevisNumber(),
      _id: new mongoose.Types.ObjectId()
    });

    const validationError = newDevis.validateSync();
    if (validationError) {
      throw validationError;
    }

    await newDevis.save();
    res.status(201).json(newDevis);
  } catch (error) {
    console.error(`Erreur lors de la création du devis: ${error}`);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation Error', details: errors });
    } else {
      res.status(500).json({ error: 'Erreur lors de la création du devis.', details: error.message });
    }
  }
};

exports.updateDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findByIdAndUpdate(id, req.body, { new: true });
    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findByIdAndDelete(id);
    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    res.status(200).json({ message: 'Devis supprimé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDevisByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const devis = await Devis.find({ date: new Date(date) });
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDevisByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const devis = await Devis.find({ client: clientId });
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDevisById = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id);
    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDevisByPaymentMethod = async (req, res) => {
  try {
    const { paymentMethod } = req.params;
    const devis = await Devis.find({ paiement: paymentMethod });
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    console.error(`Erreur lors de la récupération des devis : ${error}`);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des devis.' });
  }
};
