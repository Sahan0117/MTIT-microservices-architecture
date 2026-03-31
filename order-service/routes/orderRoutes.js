const express = require("express");
const router = express.Router();

const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerId
 *         - productId
 *         - quantity
 *         - totalAmount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the order
 *         customerId:
 *           type: integer
 *           description: ID of the customer
 *         productId:
 *           type: integer
 *           description: ID of the product
 *         quantity:
 *           type: integer
 *           description: Quantity of the product ordered
 *         totalAmount:
 *           type: number
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           description: Current status of the order (e.g. Pending, Completed)
 *       example:
 *         id: 1
 *         customerId: 101
 *         productId: 1
 *         quantity: 2
 *         totalAmount: 3000
 *         status: Pending
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.post("/", createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update the order by the id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated
 *       404:
 *         description: The order was not found
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Remove the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */
router.delete("/:id", deleteOrder);

module.exports = router;
