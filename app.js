const express = require("express");
require('dotenv').config();
const { setupSequelize, connectDB } = require("./Config/database.js");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/user-routes.js"));
app.use("/api/exam", require("./routes/exam-routes.js"))
app.use("/api/class", require("./routes/class-routes.js"));
app.use("/api/class-student", require("./routes/class-student-routes.js"));

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

