const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Service API",
      version: "1.0.0",
      description: "Handles all product operations for the platform",
    },
    servers: [
      {
        url: "http://localhost:3002",
        description: "Direct access",
      },
    ],
  },
  apis: ["./routes/*.js"], // reads JSDoc comments from route files
};

module.exports = swaggerJsDoc(options);
