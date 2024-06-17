const FournisseurDevis = require('../models/FournisseurDevis');
const Fournisseur = require('../models/supplierModel');
const Produit = require('../models/productModel');

exports.createDevis = async (req, res) => {
  try {
    console.log('Received createDevis request:', req.body); // Log la requête reçue
    const newDevis = new FournisseurDevis(req.body);
    const savedDevis = await newDevis.save();
    res.status(201).json(savedDevis);
  } catch (error) {
    console.error('Error creating devis:', error); // Log l'erreur
    res.status(400).json({ message: error.message });
  }
};

exports.getDevis = async (req, res) => {
  try {
    const devis = await FournisseurDevis.find().populate('fournisseur').populate('produits.produit');
    console.log('Fetched devis:', devis); // Log les devis récupérés
    res.status(200).json(devis);
  } catch (error) {
    console.error('Error fetching devis:', error); // Log l'erreur
    res.status(400).json({ message: error.message });
  }
};

exports.getDevisById = async (req, res) => {
  try {
    const devis = await FournisseurDevis.findById(req.params.id).populate('fournisseur').populate('produits.produit');
    if (!devis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    res.status(200).json(devis);
  } catch (error) {
    console.error('Error fetching devis by ID:', error); // Log l'erreur
    res.status(400).json({ message: error.message });
  }
};

exports.updateDevis = async (req, res) => {
  try {
    const updatedDevis = await FournisseurDevis.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDevis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    res.status(200).json(updatedDevis);
  } catch (error) {
    console.error('Error updating devis:', error); // Log l'erreur
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDevis = async (req, res) => {
  try {
    const deletedDevis = await FournisseurDevis.findByIdAndDelete(req.params.id);
    if (!deletedDevis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    res.status(200).json({ message: 'Devis deleted' });
  } catch (error) {
    console.error('Error deleting devis:', error); // Log l'erreur
    res.status(400).json({ message: error.message });
  }
};
