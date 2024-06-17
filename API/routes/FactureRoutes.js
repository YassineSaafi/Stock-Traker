const express = require('express');
const router = express.Router();
const factureController = require('../controllers/FactureController');

router.post('/create', factureController.createInvoice);
router.put('/update/:id', factureController.updateInvoice);
router.delete('/delete/:id', factureController.deleteInvoice);
router.get('/bydate/:date', factureController.getInvoicesByDate);
router.get('/byclient/:clientId', factureController.getInvoicesByClient);
router.get('/byid/:id', factureController.getInvoiceById);
router.get('/bypaymentmethod/:paymentMethod', factureController.getInvoicesByPaymentMethod);
router.get('/print/:id', factureController.printInvoice);
router.get('/', factureController.getAll);

module.exports = router;
