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
    '/api/orders': 'http://localhost:5003/orders',
    '/api/inventory': 'http://localhost:5004/api/inventory',
    '/docs/products': 'http://localhost:3002/api-docs',
    '/docs/payments': 'http://localhost:8084/api/payments/api-docs',
    '/docs/customers': 'http://localhost:5002/api-docs',
    '/docs/orders': 'http://localhost:5003/api-docs',
    '/docs/inventory': 'http://localhost:5004/api-docs',
};

// Redirect /docs/* routes without a trailing slash to avoid Swagger relative path errors
app.use((req, res, next) => {
    if (req.path === '/docs/products' || req.path === '/docs/payments' || req.path === '/docs/customers' || req.path === '/docs/orders' || req.path === '/docs/inventory') {
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
    const services = [
        { name: 'Products', path: 'products', color: '#3b82f6', icon: '📦' },
        { name: 'Payments', path: 'payments', color: '#10b981', icon: '💳' },
        { name: 'Customers', path: 'customers', color: '#f59e0b', icon: '👥' },
        { name: 'Orders', path: 'orders', color: '#ef4444', icon: '🛒' },
        { name: 'Inventory', path: 'inventory', color: '#8b5cf6', icon: '🏭' }
    ];

    const cardsHtml = services.map(service => `
        <div class="card" style="--accent: ${service.color}">
            <div class="card-icon">${service.icon}</div>
            <h2 class="card-title">${service.name} Service</h2>
            <p class="card-description">Manage and monitor ${service.name.toLowerCase()} operations efficiently.</p>
            <div class="card-status">
                <span class="status-dot"></span>
                <span class="status-text">Active</span>
            </div>
            <div class="card-actions">
                <a href="/api/${service.path}" class="btn btn-primary">Endpoint</a>
                <a href="/docs/${service.path}" class="btn btn-secondary">API Docs</a>
            </div>
        </div>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Microservice Hub | API Gateway</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                :root {
                    --bg-color: #0f172a;
                    --card-bg: rgba(255, 255, 255, 0.03);
                    --card-border: rgba(255, 255, 255, 0.1);
                    --text-main: #f8fafc;
                    --text-secondary: #94a3b8;
                    --primary: #3b82f6;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }

                body {
                    background-color: var(--bg-color);
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%);
                    color: var(--text-main);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 4rem 2rem;
                }

                header {
                    text-align: center;
                    margin-bottom: 4rem;
                    animation: fadeInDown 0.8s ease-out;
                }

                h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .subtitle {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                    width: 100%;
                    max-width: 1200px;
                }

                .card {
                    background: var(--card-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--card-border);
                    border-radius: 20px;
                    padding: 2rem;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    animation: fadeInUp 0.6s ease-out both;
                }

                .card:hover {
                    transform: translateY(-10px);
                    border-color: var(--accent);
                    box-shadow: 0 20px 40px -20px var(--accent);
                    background: rgba(255, 255, 255, 0.05);
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--accent);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .card:hover::before {
                    opacity: 1;
                }

                .card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    display: inline-block;
                }

                .card-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }

                .card-description {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                }

                .card-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    font-size: 0.85rem;
                    color: #10b981;
                    font-weight: 500;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #10b981;
                    animation: pulse 2s infinite;
                }

                .card-actions {
                    display: flex;
                    gap: 1rem;
                }

                .btn {
                    flex: 1;
                    padding: 0.75rem;
                    border-radius: 12px;
                    text-decoration: none;
                    text-align: center;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                }

                .btn-primary {
                    background: var(--accent);
                    color: white;
                    box-shadow: 0 4px 12px -4px var(--accent);
                }

                .btn-primary:hover {
                    filter: brightness(1.1);
                    transform: scale(1.02);
                }

                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                /* Staggered animation for cards */
                .card:nth-child(1) { animation-delay: 0.1s; }
                .card:nth-child(2) { animation-delay: 0.2s; }
                .card:nth-child(3) { animation-delay: 0.3s; }
                .card:nth-child(4) { animation-delay: 0.4s; }
                .card:nth-child(5) { animation-delay: 0.5s; }

                @media (max-width: 640px) {
                    body { padding: 2rem 1rem; }
                    h1 { font-size: 2rem; }
                    .grid { grid-template-columns: 1fr; }
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Microservice Architecture Hub</h1>
                <p class="subtitle">API Gateway running at port ${PORT}</p>
            </header>

            <div class="grid">
                ${cardsHtml}
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
