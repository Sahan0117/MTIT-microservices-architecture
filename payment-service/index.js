const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = 8084;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

// Swagger UI — access at http://localhost:8084/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});