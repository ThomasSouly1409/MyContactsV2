const express = require("express");
const requireAuth = require("../middleware/auth");
const router = express.Router();

router.get("/protected", requireAuth, (req, res) => {
  res.json({ message: "Route protégée accédée", userId: req.user.id });
});

module.exports = router;