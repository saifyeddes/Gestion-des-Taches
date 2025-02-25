const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
<<<<<<< HEAD
    console.log("Requête reçue :", req.body);
=======
    console.log("Données reçues :", req.body); // Affiche les données reçues
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    let user = await User.findOne({ email });
    if (user) {
<<<<<<< HEAD
      return res.status(400).json({ msg: "Email déjà utilisé" });
=======
      console.log("Utilisateur déjà existant :", email);
      return res.status(400).json({ msg: "Cet email est déjà utilisé" });
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();
    console.log("Utilisateur créé :", user);

    res.status(201).json({ msg: "Inscription réussie !" });
  } catch (error) {
<<<<<<< HEAD
    console.error("Erreur serveur :", error);
=======
    console.error("Erreur serveur :", error); // Affiche l'erreur
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
