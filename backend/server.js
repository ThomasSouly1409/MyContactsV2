const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contactRoute");
const testRoutes = require("./routes/test");

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "Documentation de l’API MyContacts (auth + contacts)",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Serveur local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/", testRoutes);

app.get("/", (req, res) => res.json({ message: "API MyContacts" }));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connecté");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err.message));
