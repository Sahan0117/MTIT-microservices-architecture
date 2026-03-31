const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080;

app.use(cors());

// Define routes to microservices
const routes = {
    '/api/products': 'http://localhost:3002/products',
    '/api/payments': 'http://localhost:8084/api/payments',
    '/api/customers': 'http://localhost:5002/api/customers',
    '/docs/products': 'http://localhost:3002/api-docs',
    '/docs/payments': 'http://localhost:8084/api-docs',
    '/docs/customers': 'http://localhost:5002/api-docs',
};

// Redirect /docs/* routes without a trailing slash to avoid Swagger relative path errors
app.use((req, res, next) => {
    if (req.path === '/docs/products' || req.path === '/docs/payments' || req.path === '/docs/customers') {
        const url = req.originalUrl;
        if (!url.endsWith('/')) {
            return res.redirect(url + '/');
        }
    }
    next();
});

// Setup proxy middleware for each route
for (const [path, target] of Object.entries(routes)) {
    app.use(
        path,
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
            pathRewrite: {
                [`^${path}`]: '', // remove base path
            },
        })
    );
}

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>API Gateway</title></head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>API Gateway is running on port ${PORT}</h1>
                <h2>Microservices</h2>
                <ul>
                    <li><a href="/api/products">Products API</a></li>
                    <li><a href="/api/payments">Payments API</a></li>
                    <li><a href="/api/customers">Customers API</a></li>
                </ul>
                <h2>Swagger Documentation</h2>
                <ul>
                    <li><a href="/docs/products">Products API Docs</a></li>
                    <li><a href="/docs/payments">Payments API Docs</a></li>
                    <li><a href="/docs/customers">Customers API Docs</a></li>
                </ul>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
