const express = require('express');
const router = express.Router();
const chequeController = require('../controllers/ChequeController');

router.post('/add', chequeController.addCheque);
router.get('/', chequeController.getAllCheques);
router.delete('/:id', chequeController.deleteCheque);
router.get('/date/:date', chequeController.getChequesByDate);
router.get('/client/:clientId', chequeController.getChequesByClient);
router.get('/etat/:etat', chequeController.getChequesByEtat);

module.exports = router;
