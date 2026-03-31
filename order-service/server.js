const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Order Service is running");
});

// Swagger UI — access at http://localhost:5003/api-docs
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service running on http://localhost:${PORT}`);
});
