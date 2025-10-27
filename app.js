const express = require("express");
require('dotenv').config();
const { setupSequelize, connectDB } = require("./Config/database.js");
const path = require('path');

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/user-routes.js"));
app.use("/api/exam", require("./routes/exam-routes.js"))
app.use("/api/classManagement", require("./routes/classManagement-routes.js"));
app.use("/api/teacher", require("./routes/teacher-class-routes.js"));
app.use("/api/student", require("./routes/student-classs-routes.js"));

// const redoc = require('redoc-express');
// app.get('/docs/api-documents.json', (req, res) => {
//   const filePath = path.join(__dirname, 'docs', 'api-documents.json');
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: 'File not found' });
//   }
//   res.setHeader('Content-Type', 'application/json');
//   res.sendFile(filePath);
// });
app.use('/docs', express.static(path.join(__dirname, 'docs')));


connectDB().then(() => {
  setupSequelize.sync({ alter: true }).then(() => {
    console.log("Database đã được đồng bộ");
  }).catch((err) => {
    console.error("Lỗi đồng bộ database:", err);
  });
  const portServer = process.env.PORT || 3050
  app.listen(portServer, () => {
    console.log(`Server đang chạy tại http://localhost:${portServer}`);
  });
});

