const db = require('../config/db');

const Inventory = {
    getAll: (callback) => {
        db.query('SELECT * FROM inventory', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM inventory WHERE inventory_id = ?', [id], callback);
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO inventory (product_id, stock_quantity, reorder_level, warehouse_location)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            query,
            [
                data.product_id,
                data.stock_quantity,
                data.reorder_level,
                data.warehouse_location
            ],
            callback
        );
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE inventory
            SET product_id = ?, stock_quantity = ?, reorder_level = ?, warehouse_location = ?
            WHERE inventory_id = ?
        `;
        db.query(
            query,
            [
                data.product_id,
                data.stock_quantity,
                data.reorder_level,
                data.warehouse_location,
                id
            ],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM inventory WHERE inventory_id = ?', [id], callback);
    }
};

module.exports = Inventory;