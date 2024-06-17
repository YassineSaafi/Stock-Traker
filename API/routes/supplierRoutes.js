const express = require('express');
const {
  createFournisseur,
  getFournisseurs,
  getFournisseurById,
  updateFournisseur,
  deleteFournisseur ,
  searchSuppliers
} = require('../controllers/supplierController');

const router = express.Router();

// Routes pour les fournisseurs
router.post('/', createFournisseur);
router.get('/', getFournisseurs);
router.get('/:id', getFournisseurById);
router.put('/:id', updateFournisseur);
router.delete('/:id', deleteFournisseur);
router.get('/search', searchSuppliers);
module.exports = router;
