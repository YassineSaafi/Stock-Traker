// middleware/error-handler.js

module.exports = function errorHandler(err, req, res, next) {
    console.error('Erreur non capturée : ', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  };
  