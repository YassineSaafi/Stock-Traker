const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });

    try {
        const decoded = jwt.verify(token, 'test'); // Assurez-vous que la clé ici ('test') correspond à celle utilisée pour signer le token dans votre application
        req.user = decoded;
        console.log('Decoded user:', decoded); // Ajoutez ce log pour voir les détails du token décodé
        next();
    } catch (e) {
        console.error('Error verifying token:', e); // Log l'erreur de vérification du token
        res.status(400).json({ msg: 'Token invalide' });
    }
}

function checkRole(role) {
    return function (req, res, next) {
        if (req.user.role !== role) {
            return res.status(403).json({ msg: 'Accès interdit' });
        }
        next();
    }
}

module.exports = { auth, checkRole };
