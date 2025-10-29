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

app.get("/", async (req, res) => {
  try {
    await setupSequelize.authenticate();
    res.json({ message: "Server OK - DB connected" });
  } catch (err) {
    res.status(500).json({ message: "DB connection failed", error: err.message });
  }
});

const fs = require("fs");

app.get("/docs", (req, res) => {
  const spec = fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="data:,">
      </head>
      <body>
        <redoc spec-url='/api-docs/swagger.json'></redoc>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  `);
});

// Route để ReDoc load file JSON
app.get("/api-docs/swagger.json", (req, res) => {
  res.sendFile(path.join(__dirname, "docs/swagger.json"));
});

connectDB().then(() => {
  setupSequelize.sync({ alter: true })
    .then(() => console.log("Database đã được đồng bộ"))
    .catch((err) => console.error("Lỗi đồng bộ database:", err));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;
