// routes/ventesRoutes.js

const express = require('express');
const router = express.Router();
const ventesController = require('../controllers/ventesController');

router.get('/:clientId', ventesController.getVentesClient);

module.exports = router;
