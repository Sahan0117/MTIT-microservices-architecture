const products = require("../models/productModel");

// Get all products
const getAllProducts = (req, res) => {
    res.status(200).json(products);
};

// Get product by ID
const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
};

// Create new product
const createProduct = (req, res) => {
    const { name, price, category, stock } = req.body;

    if (!name || price === undefined || !category || stock === undefined) {
        return res.status(400).json({
            message: "Name, price, category, and stock are required"
        });
    }

    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name,
        price,
        category,
        stock
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

// Update product
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, category, stock } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    res.status(200).json({
        message: "Product updated successfully",
        product
    });
};

// Delete product
const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct: deletedProduct[0]
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};