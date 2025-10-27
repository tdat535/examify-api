const express = require("express");
const { setupSequelize, connectDB } = require("./Config/database.js");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/user-routes.js"));
app.use("/api/exam", require("./routes/exam-routes.js"));
app.use("/api/classManagement", require("./routes/classManagement-routes.js"));
app.use("/api/teacher", require("./routes/teacher-class-routes.js"));
app.use("/api/student", require("./routes/student-classs-routes.js"));

app.get("/", async (req, res) => {
  try {
    await setupSequelize.authenticate();
    res.json({ message: "Server OK - DB connected" });
  } catch (err) {
    res.status(500).json({ message: "DB connection failed", error: err.message });
  }
});

//app.use("/docs", express.static(path.join(__dirname, "docs")));

connectDB().then(() => {
  setupSequelize.sync({ alter: true })
    .then(() => console.log("Database đã được đồng bộ"))
    .catch((err) => console.error("Lỗi đồng bộ database:", err));
});

module.exports = app;
