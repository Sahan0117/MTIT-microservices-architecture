const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Service API',
            version: '1.0.0',
            description: 'A REST API for managing inventory items in the MTIT microservices architecture project.',
            contact: {
                name: 'Dinithi Gamage'
            }
        },
        servers: [
            {
                url: 'http://localhost:5001',
                description: 'Local development server'
            }
        ],
        tags: [
            {
                name: 'Inventory',
                description: 'Operations related to inventory management'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;