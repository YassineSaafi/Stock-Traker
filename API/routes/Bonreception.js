const express = require('express');
const router = express.Router();
const bonReceptionController = require('../controllers/Bonréception');

// Créer un bon de réception
router.post('/bonreceptions', bonReceptionController.createBonReception);

// Récupérer tous les bons de réception
router.get('/bonreceptions', bonReceptionController.getAllBonReceptions);

// Récupérer un bon de réception par son ID
router.get('/bonreceptions/:id', bonReceptionController.getBonReceptionById);

// Mettre à jour un bon de réception
router.put('/bonreceptions/:id', bonReceptionController.updateBonReception);

// Supprimer un bon de réception
router.delete('/bonreceptions/:id', bonReceptionController.deleteBonReception);

module.exports = router;
