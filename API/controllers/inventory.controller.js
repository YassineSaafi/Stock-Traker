const Inventory = require('../models/inventory');

// Créer un nouvel inventaire
exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Récupérer tous les inventaires
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.send(inventories);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer un inventaire par ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Mettre à jour un inventaire
exports.updateInventory = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['productName', 'SKU', 'category', 'quantity', 'unitPrice', 'receptionDate', 'lastUpdate', 'status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Mise à jour non valide!' });
  }

  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }

    updates.forEach(update => inventory[update] = req.body[update]);
    await inventory.save();
    res.send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Supprimer un inventaire
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};
