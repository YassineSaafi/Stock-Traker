const Invoice = require('../models/FactureModel');
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const Client = require('../models/clientModel');

exports.createInvoice = async (req, res) => {
  try {
    // Générer un numéro de facture unique
    const generateFactureNumber = () => {
      // Implémentez la logique de génération du numéro de facture unique ici
      // Par exemple, en utilisant un compteur, une date, ou une combinaison de ces éléments
      return 'FACT-' + Date.now(); // Exemple simple basé sur l'horodatage
    };

    // Ajouter le numéro de facture et générer automatiquement un _id
    const newInvoice = new Invoice({
      ...req.body,
      num: generateFactureNumber(),
      _id: new mongoose.Types.ObjectId()
    });

    // Valider la nouvelle facture
    const validationError = newInvoice.validateSync();
    if (validationError) {
      throw validationError;
    }

    // Enregistrer la nouvelle facture
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(`Erreur lors de la création de la facture: ${error}`);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation Error', details: errors });
    } else {
      res.status(500).json({ error: 'Erreur lors de la création de la facture.', details: error.message });
    }
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    for (const item of invoice.produits) {
      const product = await Product.findById(item.idProduit);
      if (product) {
        product.qte += item.qte;
        await product.save();
      }
    }
    res.status(200).json({ message: 'Facture supprimée' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInvoicesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const invoices = await Invoice.find({ date: new Date(date) });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInvoicesByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const invoices = await Invoice.find({ client: clientId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInvoicesByPaymentMethod = async (req, res) => {
  try {
    const { paymentMethod } = req.params;
    const invoices = await Invoice.find({ paiement: paymentMethod });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.printInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate('client').populate('produits.idProduit');
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    const printableInvoice = {
      num: generateFactureNumber(),
      client: {
        nom: invoice.client.nom,
        adresse: invoice.client.adresse,
        telephone: invoice.client.telephone,
        email: invoice.client.email,
      },
      produits: invoice.produits.map(item => ({
        nomProduit: item.nom,
        prixUnitaire: item.prix,
        quantite: item.qte,
        total: item.prix * item.qte
      })),
      somme: invoice.somme,
      paiement: invoice.paiement,
      date: invoice.date
    };

    res.status(200).json(printableInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error(`Erreur lors de la récupération des factures : ${error}`);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des factures.' });
  }
};
