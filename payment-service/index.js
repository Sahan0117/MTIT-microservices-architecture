const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = 8084;

app.use(cors());
app.use(express.json());

// ✅ Swagger FIRST — before payment routes
app.use("/api/payments/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes AFTER
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api/payments/api-docs`);
});