const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = 8084;

app.use(cors());
app.use(express.json());

// Swagger — direct access
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Direct access: http://localhost:8084/api/payments
app.use("/api/payments", paymentRoutes);

// ✅ Via gateway (gateway strips /api/payments → sends as "/")
app.use("/", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});