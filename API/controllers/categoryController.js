// controllers/categoryController.js

const Category = require('../models/category');

// Récupérer toutes les catégories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter une nouvelle catégorie
exports.addCategory = async (req, res) => {
  const category = new Category({ name: req.body.name });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Modifier une catégorie existante
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    category.name = req.body.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    await category.remove();
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
