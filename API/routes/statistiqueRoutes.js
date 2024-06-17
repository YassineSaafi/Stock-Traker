// routes/statistiquesRoutes.js

const express = require('express');
const router = express.Router();
const statistiquesController = require('../controllers/statistiqueController');

router.get('/statistiques', statistiquesController.getStatistiques);

module.exports = router;
