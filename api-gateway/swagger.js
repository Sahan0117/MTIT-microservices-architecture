const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Consolidated Microservices API",
      version: "1.0.0",
      description: "Unified API documentation for all microservices in the MTIT architecture.",
      contact: {
        name: "API Gateway Support",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "API Gateway",
      },
    ],
  },
  // Path to the API docs
  apis: [
    path.join(__dirname, "../product-service/routes/*.js"),
    path.join(__dirname, "../payment-service/routes/*.js"),
    path.join(__dirname, "../customer-service/routes/*.js"),
    path.join(__dirname, "../order-service/routes/*.js"),
    path.join(__dirname, "../Inventory-service/routes/*.js"),
  ],
};

const swaggerSpec = swaggerJsDoc(options);

// Post-processing to fix path inconsistencies
// Some services like 'product-service' use paths like '/products' but they are exposed via '/api/products'
Object.keys(swaggerSpec.paths).forEach((pathKey) => {
  if (!pathKey.startsWith("/api/")) {
    const newPathKey = `/api${pathKey.startsWith("/") ? "" : "/"}${pathKey}`;
    swaggerSpec.paths[newPathKey] = swaggerSpec.paths[pathKey];
    delete swaggerSpec.paths[pathKey];
  }
});

module.exports = swaggerSpec;
