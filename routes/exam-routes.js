const express = require('express');
const routes = express.Router();;
const { createExam, addQuestionAndAnswersToExam,getExamsByClassId, getExamById, getExamResultsByUser, submitExam } = require("../services/exam-services");

routes.post("/create-exam", async (req, res) => {
    try {
        const examData = {
            title: req.body.title,
            duration: req.body.duration,
            quantityQuestion: req.body.quantityQuestion,
            classId: req.body.classId || 1,
        }
        
        const result = await createExam(examData);

        res.status(200).send({
            status: true,
            message: "Tạo đề thi thành công",
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

routes.post("/add-question/:examId", async (req, res) => {
    try {
        const examId = req.params.examId;
        const questionData = req.body.questionList;

        const result = await addQuestionAndAnswersToExam(examId, questionData);

        res.status(200).send({
            status: true,
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

// ✅ NEW: Lấy danh sách bài thi theo mã lớp
routes.get("/getExamsByClass/:classId", async (req, res) => {
  try {
    const classId = req.params.classId;
    const exams = await getExamsByClassId(classId);
    res.status(200).send({
      status: true,
      message: "Lấy danh sách bài thi thành công",
      data: exams,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
});

routes.get("/getExamDetail/:id", async (req, res) => {
    try {
        const examId = req.params.id;

        const result = await getExamById(examId);

        res.status(200).send({
            status: true,
            message: "Lấy đề thi thành công",
            data: result
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.post("/submit-exam/:examId", async (req, res) => {
    try {
        const examId = req.params.examId;
        const answers = req.body.answers;
        const userId = req.body.userId;
        
        const result = await submitExam(examId, userId, answers);

        res.status(200).send({
            status: true,
            message: "Nộp bài thi thành công",
            data: result
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.get("/exam-results/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await getExamResultsByUser(userId);
        res.status(200).send({
            status: true,
            message: "Lấy kết quả thi thành công",
            data: result
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

module.exports = routes;