const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: { title: "MyContacts API", version: "1.0.0" },
    servers: [{ url: "http://localhost:4000" }]
  },
  apis: ["./routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes Auth
app.use("/auth", authRoutes);

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connecté");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
  })
  .catch(err => console.error("Erreur MongoDB:", err.message));