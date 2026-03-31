const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const swaggerSpec = require("./swagger/swagger");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Customer Service is running"
  });
});

app.use("/api/customers", customerRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Customer Service running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});