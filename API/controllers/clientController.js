const Client = require('../models/clientModel');

// Ajouter un client
exports.addClient = async (req, res) => {
  try {
    console.log('Requête reçue pour ajouter un client:', req.body);
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du client:', error);
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les clients
exports.getClients = async (req, res) => {
  try {
    console.log('Requête reçue pour obtenir tous les clients');
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erreur lors de l\'obtention des clients:', error);
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un client par ID
exports.getClientById = async (req, res) => {
  try {
    console.log('Requête reçue pour obtenir un client par ID:', req.params.id);
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Erreur lors de l\'obtention du client:', error);
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    console.log('Requête reçue pour mettre à jour un client:', req.params.id);
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du client:', error);
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    console.log('Requête reçue pour supprimer un client:', req.params.id);
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    console.error('Erreur lors de la suppression du client:', error);
    res.status(400).json({ message: error.message });
  }
};