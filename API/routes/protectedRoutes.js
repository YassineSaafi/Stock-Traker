const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware /auth');

router.get('/admin', auth, checkRole('superAdmin'), (req, res) => {
    res.send('Bienvenue Super Admin');
});

router.get('/vente', auth, checkRole('Responsable de vente'), (req, res) => {
    res.send('Bienvenue Responsable de vente');
});

module.exports = router;
