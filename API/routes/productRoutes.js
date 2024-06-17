// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route pour créer un nouveau produit
router.post('/', productController.add);

// Route pour supprimer un produit par son ID
router.delete('/:id', productController.delete);

// Route pour récupérer un produit par son ID
router.get('/:id', productController.get);

// Route pour mettre à jour un produit par son ID
router.put('/:id', productController.set);

// Route pour définir le prix d'un produit par son ID
router.put('/:id/prix', productController.setPrix);
router.get('/by-categories', productController.getProduitsByCategories);
router.get('/categories', productController.getCategoriesProduits);
// Route pour définir la quantité d'un produit par son ID
router.put('/:id/qte', productController.setQte);
router.get('/', productController.getAllProducts);


module.exports = router;
