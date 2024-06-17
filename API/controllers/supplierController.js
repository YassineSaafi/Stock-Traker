const Fournisseur = require('../models/supplierModel');

// Créer un nouveau fournisseur
exports.createFournisseur = async (req, res) => {
  try {
    const newFournisseur = new Fournisseur(req.body);
    await newFournisseur.save();
    res.status(201).json(newFournisseur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.status(200).json(fournisseurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un fournisseur par ID
exports.getFournisseurById = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ error: 'Fournisseur non trouvé' });
    }
    res.status(200).json(fournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un fournisseur
exports.updateFournisseur = async (req, res) => {
  try {
    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFournisseur) {
      return res.status(404).json({ error: 'Fournisseur non trouvé' });
    }
    res.status(200).json(updatedFournisseur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un fournisseur
exports.deleteFournisseur = async (req, res) => {
  try {
    const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!deletedFournisseur) {
      return res.status(404).json({ error: 'Fournisseur non trouvé' });
    }
    res.status(200).json({ message: 'Fournisseur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchSuppliers = async (req, res) => {
  try {
    const query = req.query.query;
    console.log(`Received query: ${query}`); // Log the received query

    let searchConditions = [];

    if (query) {
      // Add regex search condition for the name
      searchConditions.push({ nom: new RegExp(query, 'i') });

      // Check if query is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(query)) {
        searchConditions.push({ _id: query });
      }
    }

    // Log the search conditions
    console.log(`Search conditions:`, searchConditions);

    // Perform the search based on conditions
    const suppliers = await Fournisseur.find({
      $or: searchConditions
    });

    res.status(200).json(suppliers);
  } catch (error) {
    console.error(`Error in searchSuppliers: ${error.message}`); // Log the error
    res.status(500).json({ message: 'Erreur lors de la recherche des fournisseurs', error });
  }
};
