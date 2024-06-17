const express = require('express');
const router = express.Router();
const chequeController = require('../controllers/ChequeController');
const multer = require('multer');

// Configuration de Multer pour enregistrer les fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier enregistré
    }
});

// Initialiser Multer avec la configuration
const upload = multer({ storage: storage });

router.post('/add', upload.single('copie'), chequeController.addCheque);
router.get('/', chequeController.getAllCheques);
router.delete('/:id', chequeController.deleteCheque);
router.get('/date/:date', chequeController.getChequesByDate);
router.get('/client/:clientId', chequeController.getChequesByClient);
router.get('/etat/:etat', chequeController.getChequesByEtat);

module.exports = router;
