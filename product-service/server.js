const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Product Service is running");
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Product Service running on http://localhost:${PORT}`);
});