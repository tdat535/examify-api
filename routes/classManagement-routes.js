const express = require('express');
const routes = express.Router();
const { getAllClasses, getClassById, updateClass, deleteClass } = require("../services/class-management-service");


routes.get("/getAllClass", async (req, res) => {
  try {
    const result = await getAllClasses();
    res.status(200).send({
      status: true,
      message: "Lấy danh sách lớp học thành công",
      data: result.data
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message
    });
  }
});

// 🔍 Lấy chi tiết lớp
routes.get("/detail/:classId", async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await getClassById(classId);
        res.status(200).send({
            status: true,
            message: "Lấy thông tin lớp thành công",
            data: result.data
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// ✏️ Cập nhật lớp học
routes.put("/update/:classId", async (req, res) => {
    try {
        const { classId } = req.params;
        const { className, teacherId } = req.body;
        const result = await updateClass(classId, className, teacherId);
        res.status(200).send({
            status: true,
            message: result.message
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// ❌ Xóa lớp học
routes.delete("/delete/:classId", async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await deleteClass(classId);
        res.status(200).send({
            status: true,
            message: result.message
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

module.exports = routes;
