const express = require('express');
const routes = express.Router();;
const { createClass, deleteClass, getAllClasses, getClassById, updateClass } = require("../services/class-service");

routes.post("/create-exam", async (req, res) => {
    try {
        const classData = {
            className: req.body.className,
            teacherId: req.body.teacherId,
        }
        
        const result = await createClass(classData);

        res.status(200).send({
            status: true,
            message: "Tạo lớp thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})
routes.get("/get-all-class", async (req, res) => {
    try {
        const result = await getAllClasses();

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
        })
    }
})

routes.get("/get-class/:id", async (req, res) => {
    try {
        const classId = req.params.id;

        const result = await getClassById(classId);

        res.status(200).send({
            status: true,
            message: "Lấy thông tin lớp thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.put("/update-class/:id", async (req, res) => {
    try {
        const classId = req.params.id;
        const classData = {
            className: req.body.className,
            teacherId: req.body.teacherId,
        }

        const result = await updateClass(classId, classData);

        res.status(200).send({
            status: true,
            message: "Cập nhật lớp thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.delete("/delete-class/:id", async (req, res) => {
    try {
        const classId = req.params.id;

        const result = await deleteClass(classId);

        res.status(200).send({
            status: true,
            message: "Xóa lớp thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

module.exports = routes;