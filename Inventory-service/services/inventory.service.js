const Inventory = require('../models/inventory.model');

exports.getAllInventory = (req, res) => {
    Inventory.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getInventoryById = (req, res) => {
    const id = req.params.id;

    Inventory.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json(results[0]);
    });
};

exports.createInventory = (req, res) => {
    Inventory.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Inventory created successfully',
            inventory_id: result.insertId
        });
    });
};

exports.updateInventory = (req, res) => {
    const id = req.params.id;

    Inventory.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json({ message: 'Inventory updated successfully' });
    });
};

exports.deleteInventory = (req, res) => {
    const id = req.params.id;

    Inventory.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json({ message: 'Inventory deleted successfully' });
    });
};