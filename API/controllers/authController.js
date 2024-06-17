const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nom, email, pw, role } = req.body;
console.log( nom, email, pw, role)
    try {
        const hashedPassword = await bcrypt.hash(pw, 10);
        const newUser = new User({
            nom,
            email,
            pw: hashedPassword,
            role
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, pw } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(pw, user.pw);
        if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-pw');
        if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Erreur serveur' });
    }
}
exports.supprimerUtilisateur = async (req, res) => {
    try {
      const userId = req.params.id; // ID de l'utilisateur à supprimer
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: error.message });
    }
  };
  
  // Méthode pour modifier le rôle d'un utilisateur
  exports.modifierRole = async (req, res) => {
    try {
      const { id, newRole } = req.body; // ID de l'utilisateur et nouveau rôle à modifier
      const updatedUser = await User.findByIdAndUpdate(id, { role: newRole }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Rôle utilisateur modifié avec succès", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification du rôle de l'utilisateur", error: error.message });
    }
  };
  exports.getUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); // Exclure le champ mot de passe
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
    }
  };


      
      
     