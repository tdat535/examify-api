const swaggerJsDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Examify API",
    version: "1.0.0",
    description: "API quản lý ứng dụng học tập",
  },
  servers: [
    { url: "https://examify-api-iota.vercel.app" }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./docs/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

// Xuất luôn object
module.exports = swaggerSpec;
