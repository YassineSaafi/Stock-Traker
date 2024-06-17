// routes/devis.js

const express = require('express');
const router = express.Router();
const devisController = require('../controllers/devisController');

router.post('/create', devisController.createDevis);
router.put('/:id', devisController.updateDevis);
router.delete('/:id', devisController.deleteDevis);
router.get('/date/:date', devisController.getDevisByDate);
router.get('/client/:clientId', devisController.getDevisByClient);
router.get('/id/:id', devisController.getDevisById);
router.get('/payment/:paymentMethod', devisController.getDevisByPaymentMethod);
router.get('/', devisController.getAll);

module.exports = router;
