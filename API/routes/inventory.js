const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

// Créer un nouvel inventaire
router.post('/inventories', inventoryController.createInventory);

// Récupérer tous les inventaires
router.get('/inventories', inventoryController.getAllInventories);

// Récupérer un inventaire par ID
router.get('/inventories/:id', inventoryController.getInventoryById);

// Mettre à jour un inventaire
router.patch('/inventories/:id', inventoryController.updateInventory);

// Supprimer un inventaire
router.delete('/inventories/:id', inventoryController.deleteInventory);

module.exports = router;
