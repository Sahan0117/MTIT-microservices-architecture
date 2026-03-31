const orders = require("../models/orderModel");

// Get all orders
const getAllOrders = (req, res) => {
    res.status(200).json(orders);
};

// Get order by ID
const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find((o) => o.id === id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
};

// Create new order
const createOrder = (req, res) => {
    const { customerId, productId, quantity, totalAmount, status } = req.body;

    if (!customerId || !productId || !quantity || totalAmount === undefined) {
        return res.status(400).json({
            message: "customerId, productId, quantity, and totalAmount are required"
        });
    }

    const newOrder = {
        id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
        customerId,
        productId,
        quantity,
        totalAmount,
        status: status || "Pending"
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
};

// Update order
const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find((o) => o.id === id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const { customerId, productId, quantity, totalAmount, status } = req.body;

    if (customerId !== undefined) order.customerId = customerId;
    if (productId !== undefined) order.productId = productId;
    if (quantity !== undefined) order.quantity = quantity;
    if (totalAmount !== undefined) order.totalAmount = totalAmount;
    if (status !== undefined) order.status = status;

    res.status(200).json({
        message: "Order updated successfully",
        order
    });
};

// Delete order
const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex((o) => o.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    const deletedOrder = orders.splice(index, 1);

    res.status(200).json({
        message: "Order deleted successfully",
        deletedOrder: deletedOrder[0]
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
