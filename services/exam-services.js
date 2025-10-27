const Exam = require("../model/ExamTest");
const Question = require("../model/Question");
const Answer = require("../model/Answer");
const ExamTest = require("../model/ExamTest");
const ExamResult = require("../model/ExamResult");

const createExam = async (examData) => {

    try {
        const exam = await Exam.create({
            title: examData.title,
            duration: examData.duration,
            quantityQuestion: examData.quantityQuestion,
            classId: 1,
        });

        return {
            examId: exam.id,
            title: exam.title,
            duration: exam.duration,
            quantityQuestion: exam.quantityQuestion,
            classId: exam.classId,
            createdAt: exam.createdAt,
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const addQuestionAndAnswersToExam = async (examId, questionList) => {
    const transactionQA = await Question.sequelize.transaction();

    try {
        for (const questionData of questionList) {
            const questionCreated = await Question.create(
                {
                    content: questionData.content,
                    examId: examId,
                    score: questionData.score,
                },
                { transaction: transactionQA }
            );

            const answersCreated = [];
            for (const answerData of questionData.answers) {
                const created = await Answer.create(
                    {
                        questionId: questionCreated.id,
                        label: answerData.label,
                        content: answerData.content,
                    },
                    { transaction: transactionQA }
                );
                answersCreated.push(created);
            }
            const correctAnswers = answersCreated[questionData.correctAnswerIndex - 1];
            if (correctAnswers) {
                questionCreated.correctAnswerIndex = correctAnswers.id;
                await questionCreated.save({ transaction: transactionQA });
            }
        }

        await Exam.update(
            { updateAt: new Date() },
            { where: { id: examId }, transaction: transactionQA }
        )

        await transactionQA.commit();
        return {
            message: "Thêm câu hỏi và đáp án thành công",
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const getExamsByClassId = async (classId) => {
    try {
        const exams = await ExamTest.findAll({
            where: { classId },
            attributes: ["id", "title", "duration", "quantityQuestion", "createdAt"],
            order: [["createdAt", "DESC"]],
        });

        if (!exams || exams.length === 0) {
            throw new Error("Không có bài thi nào trong lớp này");
        }

        return exams;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getExamById = async (examId) => {
    try {
        const exam = await ExamTest.findByPk(examId, {
            include: [
                {
                    model: Question,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Answer,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }
                    ]
                }
            ]
        })

        if (!exam) {
            throw new Error("Không tìm thấy đề thi");
        }

        return exam;
    }

    catch (error) {
        throw new Error(error.message);
    }
}

const submitExam = async (examId, studentId, answers) => {
    try {
        const exam = await ExamTest.findByPk(examId, {
            include: { model: Question, include: [Answer] }
        })

        if (!exam) {
            throw new Error("Không tìm thấy đề thi");
        }
        let totalScore = 0;
        for (const question of exam.Questions) {
            const studentAnswer = answers.find(ans => ans.questionId === question.id);
            if (studentAnswer && studentAnswer.answerId === question.correctAnswerIndex) {
                totalScore += question.score;
            }
        }

        const result = await ExamResult.create({
            userId: studentId,
            examId: examId,
            score: totalScore,
            submitAt: new Date(),
        })

        return {
            examId: result.examId,
            userId: result.userId,
            score: result.score,
            submitAt: result.submitAt,
        }

    }
    catch (error) {
        throw new Error(error.message);
    }
}

const getExamResultsByUser = async (userId) => {
    try {
        const results = await ExamResult.findAll({
            where: { userId: userId },
            include: { model: ExamTest, attributes: ['title'] }
        });
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createExam, addQuestionAndAnswersToExam, getExamById, submitExam, getExamResultsByUser, getExamsByClassId };


