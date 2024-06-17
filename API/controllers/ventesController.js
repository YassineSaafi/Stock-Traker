// controllers/venteController.js
const Invoice = require('../models/FactureModel');

exports.getVentesClient = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { dateDebut, dateFin } = req.query;
  
      const ventes = await Invoice.find({
        client: clientId,
        date: {
          $gte: new Date(dateDebut),
          $lte: new Date(dateFin)
        }
      }).populate('produits.idProduit');
  
      if (!ventes.length) {
        return res.status(404).json({ message: 'Aucune vente trouvée pour ce client dans la période donnée.' });
      }
  
      res.status(200).json(ventes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
