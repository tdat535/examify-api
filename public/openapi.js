import swaggerJsDoc from "swagger-jsdoc";

// Cấu hình Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Examify API",
    version: "1.0.0",
    description: "API quản lý ứng dụng học tập, kiểm tra cho học sinh và giáo viên",
  },
  servers: [
    {
      url: "https://examify-api-iota.vercel.app",
      description: "Host server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./docs/*.js"], // đường dẫn tới các file comment Swagger
};

const swaggerSpec = swaggerJsDoc(options);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(swaggerSpec);
}
