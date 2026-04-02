const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Service API",
      version: "1.0.0",
      description: "Customer Microservice API documentation"
    },
    servers: [
      {
        url: "http://localhost:8082"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;