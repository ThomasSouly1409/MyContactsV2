const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Contact = require("../models/contactModel");

router.use(requireAuth);

// Create contact
router.post("/", async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  try {
    const contact = await Contact.create({
      firstName,
      lastName,
      phone,
      user: req.user.id,
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// All contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user.id,   //
    });
    if (!contact) return res.status(404).json({ error: "Contact introuvable" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact
router.patch("/:id", async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { firstName, lastName, phone },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: "Contact introuvable" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact) return res.status(404).json({ error: "Contact introuvable" });
    res.json({ message: "Contact supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
