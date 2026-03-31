const inventory = [
    {
        inventory_id: 1,
        product_id: 101,
        stock_quantity: 50,
        reorder_level: 5,
        warehouse_location: "Colombo",
        last_updated: new Date().toISOString()
    },
    {
        inventory_id: 2,
        product_id: 102,
        stock_quantity: 30,
        reorder_level: 10,
        warehouse_location: "Kandy",
        last_updated: new Date().toISOString()
    }
];

const Inventory = {
    getAll: (callback) => {
        callback(null, inventory);
    },

    getById: (id, callback) => {
        const item = inventory.find((i) => i.inventory_id === parseInt(id));
        callback(null, item ? [item] : []);
    },

    create: (data, callback) => {
        const newItem = {
            inventory_id: inventory.length > 0 ? inventory[inventory.length - 1].inventory_id + 1 : 1,
            product_id: data.product_id,
            stock_quantity: data.stock_quantity,
            reorder_level: data.reorder_level,
            warehouse_location: data.warehouse_location,
            last_updated: new Date().toISOString()
        };
        inventory.push(newItem);
        callback(null, { insertId: newItem.inventory_id });
    },

    update: (id, data, callback) => {
        const index = inventory.findIndex((i) => i.inventory_id === parseInt(id));
        if (index === -1) {
            return callback(null, { affectedRows: 0 });
        }
        
        inventory[index] = {
            ...inventory[index],
            ...data,
            inventory_id: parseInt(id), // Ensure ID remains consistent
            last_updated: new Date().toISOString()
        };
        callback(null, { affectedRows: 1 });
    },

    delete: (id, callback) => {
        const index = inventory.findIndex((i) => i.inventory_id === parseInt(id));
        if (index === -1) {
            return callback(null, { affectedRows: 0 });
        }
        inventory.splice(index, 1);
        callback(null, { affectedRows: 1 });
    }
};

module.exports = Inventory;