const express = require("express");
const { setupSequelize, connectDB } = require("./Config/database.js");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/user-routes.js"));
app.use("/api/exam", require("./routes/exam-routes.js"));
app.use("/api/class", require("./routes/classManagement-routes.js"));
app.use("/api/teacher", require("./routes/teacher-class-routes.js"));
app.use("/api/student", require("./routes/student-classs-routes.js"));
app.use("/api/dashboard", require("./routes/dashboard-routes.js"));

const swaggerSpec = require("./openapi.js");

app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "redoc.html"));
});

connectDB().then(() => {
  setupSequelize.sync()
    .then(() => console.log("Database đã được đồng bộ"))
    .catch((err) => console.error("Lỗi đồng bộ database:", err));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;
