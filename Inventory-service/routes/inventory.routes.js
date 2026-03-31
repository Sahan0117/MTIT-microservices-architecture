const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventory.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         inventory_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 101
 *         stock_quantity:
 *           type: integer
 *           example: 50
 *         reorder_level:
 *           type: integer
 *           example: 5
 *         warehouse_location:
 *           type: string
 *           example: Colombo
 *         last_updated:
 *           type: string
 *           format: date-time
 *           example: 2026-03-27T08:40:56.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management API
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     description: Retrieve all inventory records from the database.
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */
router.get('/', inventoryService.getAllInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get inventory item by ID
 *     description: Retrieve a single inventory record using its inventory ID.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory item not found
 */
router.get('/:id', inventoryService.getInventoryById);

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory item
 *     description: Add a new inventory record to the database.
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - stock_quantity
 *               - reorder_level
 *               - warehouse_location
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 102
 *               stock_quantity:
 *                 type: integer
 *                 example: 30
 *               reorder_level:
 *                 type: integer
 *                 example: 5
 *               warehouse_location:
 *                 type: string
 *                 example: Kandy
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *       500:
 *         description: Server error
 */
router.post('/', inventoryService.createInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update an inventory item by ID
 *     description: Update an existing inventory record using its inventory ID.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 101
 *               stock_quantity:
 *                 type: integer
 *                 example: 80
 *               reorder_level:
 *                 type: integer
 *                 example: 10
 *               warehouse_location:
 *                 type: string
 *                 example: Negombo
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', inventoryService.updateInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     description: Remove an inventory record from the database.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', inventoryService.deleteInventory);

module.exports = router;