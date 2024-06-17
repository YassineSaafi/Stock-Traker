const express = require('express');
const router = express.Router();
const multer = require('multer');
const factureAchatController = require('../controllers/FactureAchat');

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

router.post('/add', upload.single('copie'), factureAchatController.addFactureAchat);
router.get('/', factureAchatController.getAllFacturesAchat);

module.exports = router;
