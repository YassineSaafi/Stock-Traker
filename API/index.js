const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/config'); 
const clientRoutes = require('./routes/clientRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const chequeRoutes = require('./routes/ChequeRoutes'); 
const bonDeLivraisonRoutes = require('./routes/BonDeLivraisonRoutes');
const FactureRoutes = require('./routes/FactureRoutes');
const authRoutes = require('./routes/authRoutes');
const multer = require('multer');
const chequeController = require('./controllers/ChequeController');
const FactureAchatRoutes = require('./routes/FactureAchat');
const statisticsRoutes = require('./routes/statistiqueRoutes');
const ventesRoutes = require('./routes/ventesRoutes');
const errorHandler = require('./middleware /error-handler');
const inventoryRoutes = require('./routes/inventory');
const categoryRouter = require ('./routes/category');
const bonreception =require('./routes/Bonreception')
const protectedRoutes = require('./routes/protectedRoutes');
const fournisseurDevisRoutes = require('./routes/fournisseurDevis');
const Distributionmensuelle  = require('./routes/Distributionmensuelle');
const Devis = require('./routes/devisRoutes');




const PORT = process.env.PORT || 3000;
const app = express();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());

// Route configurations
app.use('/suppliers', supplierRoutes);
app.use('/clients', clientRoutes);
app.use('/api/products', productRoutes); 
app.use('/facture', FactureRoutes);

app.use('/bl', bonDeLivraisonRoutes);
app.use('/factures', FactureRoutes);
app.use('/auth', authRoutes);
app.use('/factures-achat', FactureAchatRoutes);
app.use('/statistiques', statisticsRoutes);
app.use('/bonreception', bonreception);

app.use('/def', fournisseurDevisRoutes);
app.use('/api/categories', categoryRouter);
app.use('api/vente', ventesRoutes);
const devisRoutes = require('./routes/devisRoutes');
app.use(errorHandler);
app.use('/devis', devisRoutes);
app.use('/Dist', Distributionmensuelle)//Distributionmensuelle

app.post('/chq/add', upload.single('copie'), chequeController.addCheque);
app.use('/chq', chequeRoutes);
app.use('/inventory', inventoryRoutes);


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
  });
});
