const express = require('express');
const router = express.Router();
const factureController = require('../controllers/Distributionmensuelle');

// Route pour récupérer les ventes mensuelles d'un client
router.get('/ventes-mensuelles/:clientId/:year/:month', factureController.getVentesMensuelles);

module.exports = router;
