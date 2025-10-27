const express = require('express');
const routes = express.Router();
const { joinClassByCode, getClassesByStudent } = require("../services/student-class-service");

// 🧑‍🎓 Học sinh tham gia lớp bằng mã
routes.post("/join", async (req, res) => {
    try {
        const { studentId, classCode } = req.body;
        const result = await joinClassByCode(studentId, classCode);
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

// 📚 Lấy danh sách lớp học sinh tham gia
routes.get("/getClasses/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const result = await getClassesByStudent(studentId);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách lớp học thành công",
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
        });
    }
});

module.exports = routes;
