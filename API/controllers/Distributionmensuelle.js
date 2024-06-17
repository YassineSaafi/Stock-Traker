const Facture = require('../models/FactureModel');

const getVentesMensuelles = async (req, res) => {
  try {
    const { clientId, year, month } = req.params;

    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);

    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);

    const factures = await Facture.find({
      client: clientId,
      date: {
        $gte: startDate,
        $lt: endDate
      }
    });

    const totalVentes = factures.reduce((total, facture) => total + facture.somme, 0);

    res.json({ totalVentes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVentesMensuelles,
};
