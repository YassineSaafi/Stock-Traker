const express = require('express');
const router = express.Router();
const bonDeLivraisonController = require('../controllers/BonDeLivraisonController');

router.post('/create', bonDeLivraisonController.createBonDeLivraison);
router.put('/update/:id', bonDeLivraisonController.updateBonDeLivraison);
router.delete('/delete/:id', bonDeLivraisonController.deleteBonDeLivraison);
router.get('/byid/:id', bonDeLivraisonController.getBonDeLivraisonById);
router.get('/byclient/:clientId', bonDeLivraisonController.getBonsDeLivraisonByClient);
router.get('/', bonDeLivraisonController.getAllBonsDeLivraison);

module.exports = router;
