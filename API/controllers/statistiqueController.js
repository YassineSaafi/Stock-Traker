// controllers/statistiquesController.js

const Invoice = require('../models/FactureModel');

exports.getStatistiques = async (req, res) => {
  try {
    const stats = await Invoice.aggregate([
      { $unwind: '$produits' },
      {
        $group: {
          _id: '$produits.nom',
          totalQuantite: { $sum: '$produits.qte' },
          totalRevenue: { $sum: { $multiply: ['$produits.qte', '$produits.prix'] } }
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
