const express = require('express');
const routes = express.Router();;
const { addStudentToClass, getStudentsByClass, removeStudentFromClass } = require("../services/class-student-service");

routes.post("/add-student", async (req, res) => {
    try {
        const classId = req.body.classId;
        const studentId = req.body.studentId;
        const result = await addStudentToClass(classId, studentId);
        res.status(200).send({
            status: result.status,
            message: result.message
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.get("/get-students/:classId", async (req, res) => {
    try {
        const classId = req.params.classId;
        const result = await getStudentsByClass(classId);
        res.status(200).send({
            status: result.status,
            data: result.data
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.delete("/remove-student", async (req, res) => {
    try {
        const classId = req.body.classId;
        const studentId = req.body.studentId;
        const result = await removeStudentFromClass(classId, studentId);
        res.status(200).send({
            status: result.status,
            message: result.message
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