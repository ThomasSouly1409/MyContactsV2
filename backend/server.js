const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");
const contactRoutes = require("./routes/contactRoute");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/", testRoutes);

app.get("/", (req, res) => res.json({ message: "API MyContacts" }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connecté");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
  })
  .catch(err => console.error("Erreur MongoDB:", err.message));