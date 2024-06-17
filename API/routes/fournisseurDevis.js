const express = require('express');
const router = express.Router();
const fournisseurDevisController = require('../controllers/fournisseurDevisController');

router.post('/', fournisseurDevisController.createDevis);
router.get('/', fournisseurDevisController.getDevis);
router.get('/:id', fournisseurDevisController.getDevisById);
router.put('/:id', fournisseurDevisController.updateDevis); // Correction ici
router.delete('/:id', fournisseurDevisController.deleteDevis); // Correction ici

module.exports = router;
