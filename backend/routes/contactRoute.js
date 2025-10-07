const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Contact = require("../models/contactModel");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts de l'utilisateur
 */

router.use(requireAuth);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Champs manquants
 */
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

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Récupérer un contact par ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact trouvé
 *       404:
 *         description: Contact introuvable
 */
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact) return res.status(404).json({ error: "Contact introuvable" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Modifier un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact introuvable
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact introuvable
 */
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
