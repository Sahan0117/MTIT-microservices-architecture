const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Service API",
      version: "1.0.0",
      description: "Handles all payment operations for the e-commerce platform",
    },
    servers: [
      {
        url: "http://localhost:8084",
        description: "Direct access",
      },
    ],
  },
  apis: ["./routes/*.js"], // reads JSDoc comments from route files
};

module.exports = swaggerJsDoc(options);