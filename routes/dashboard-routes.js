const express = require('express');
const routes = express.Router();
const { getDashboardByTeacher, getRecentClassesByTeacher } = require("../services/dashboard-service");
const authenticateToken = require("../middleware/authenticate");

routes.get("/data", authenticateToken,  async (req, res) => {
    try {
        const teacherId = req.user.id;
        const result = await getDashboardByTeacher(teacherId);
        res.status(200).send({
            status: true,
            message: "Lấy dữ liệu dashboard thành công",
            data: result
        });
    }   
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

routes.get("/classes", authenticateToken, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const data = await getRecentClassesByTeacher(teacherId);
    res.status(200).json({
      status: true,
      message: "Lấy danh sách 3 lớp gần nhất thành công",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = routes;