const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.add = async (req, res) => {
  try {
    const { ref, nom, qte, prix,  categorieNom } = req.body;

    // Log the received data
    console.log('Received data:', { ref, nom, qte, prix,  categorieNom });

    // Check if all fields are present
    if (!ref || !nom || !qte || !prix || ! categorieNom) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Création d'une nouvelle instance de Product avec les données reçues
    const product = new Product({ ref, nom, qte, prix,  categorieNom });

    // Sauvegarde du nouveau produit dans la base de données
    await product.save();

    // Réponse HTTP indiquant que le produit a été créé avec succès
    res.status(201).send(product);
  } catch (error) {
    // Log the error
    console.error('Error adding product:', error);
    
    // En cas d'erreur, renvoyer une réponse HTTP avec le statut 400 et l'erreur
    res.status(400).send(error);
  }
};

// Fonction pour supprimer un produit par son ID
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Produit non trouvé' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fonction pour récupérer un produit par son ID
exports.get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Produit non trouvé' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fonction pour mettre à jour un produit par son ID
exports.set = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Produit non trouvé' });
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Fonction pour définir le prix d'un produit par son ID
exports.setPrix = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { prix: req.body.prix }, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Produit non trouvé' });
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Fonction pour définir la quantité d'un produit par son ID
exports.setQte = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { qte: req.body.qte }, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Produit non trouvé' });
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getProduitsByCategories = async (req, res) => {
  try {
    console.log(req.query); // Ajoutez cette ligne pour vérifier les paramètres reçus
    const categories = req.query.categories.split(',');
    const products = await Product.find({ categorie: { $in: categories } });
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits par catégorie : ', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des produits par catégorie.' });
  }
};
exports.getCategoriesProduits = async (req, res) => {
  try {
    // Récupère tous les produits
    const products = await Product.find({});
    
    // Utilise un Set pour obtenir les catégories uniques
    const categories = [...new Set(products.map(product => product.categorie))];
    
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories de produits : ', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories de produits.' });
  }
};