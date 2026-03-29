const express = require('express');
const app = express();

const inventoryRoutes = require('./routes/inventory.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Inventory Service</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #111827;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .card {
                        background: #1f2937;
                        padding: 30px;
                        border-radius: 16px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                        text-align: center;
                        width: 420px;
                    }
                    h1 {
                        margin-bottom: 10px;
                    }
                    p {
                        color: #d1d5db;
                    }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 20px;
                        background: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 10px;
                        font-weight: bold;
                    }
                    a:hover {
                        background: #1d4ed8;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Inventory Service API</h1>
                    <p>Inventory management microservice is running successfully.</p>
                    <a href="/api-docs">Open Swagger Documentation</a>
                </div>
            </body>
        </html>
    `);
});

app.use('/api/inventory', inventoryRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: 'Inventory Service API Docs',
        customCss: `
            .topbar { display: none; }
            .swagger-ui .info { margin: 20px 0; }
            .swagger-ui .scheme-container {
                background: #f8fafc;
                padding: 12px;
                border-radius: 10px;
                box-shadow: none;
            }
        `
    })
);

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});