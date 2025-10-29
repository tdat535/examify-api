const express = require('express');
const routes = express.Router();
const { createClass, getClassesByTeacher, getStudentsByClass, removeStudentFromClass, profile } = require("../services/teacher-class-service")
const authenticateToken = require("../middleware/authenticate");
// ➕ Tạo lớp mới
routes.post("/createClass", authenticateToken, async (req, res) => {
    try {
        const teacherId = req.user.id;
        const { className } = req.body;
        console.log(req.body);
        const result = await createClass(className, teacherId);
        res.status(200).send({
            status: true,
            message: "Tạo lớp học thành công",
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

// 📋 Lấy danh sách lớp của giáo viên
routes.get("/getClasses", authenticateToken, async (req, res) => {
    try {
    const teacherId = req.user.id;
    const result = await getClassesByTeacher(teacherId);
    res.status(200).send({
        status: true,
        message: "Lấy danh sách lớp thành công",
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

// 📋 Lấy danh sách học sinh trong lớp  
routes.get("/getStudentsInClass/:classId", authenticateToken, async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await getStudentsByClass(classId);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách học sinh theo lớp",
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

// ❌ Xóa học sinh khỏi lớp
routes.delete("/deleteStudent", authenticateToken, async (req, res) => {
    try {
        const { classId, studentId } = req.body;
        const result = await removeStudentFromClass(classId, studentId);
        res.status(200).send({
            status: true,
            message: result.message,
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

routes.get("/profile", authenticateToken, async (req, res) => {
    try {
        const teacherId = req.user.id;
        console.log(teacherId);
        const result = await profile(teacherId);
        res.status(200).send({
            status: true,
            message: "Lấy thông tin giáo viên thành công",
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

module.exports = routes;