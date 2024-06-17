const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', authController. getCurrentUser);
router.get('/users', authController.getUsers);
router.delete('/users/:id', authController.supprimerUtilisateur);
router.put('/users/role', authController.modifierRole);

module.exports = router;
