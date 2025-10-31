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
      // 1️⃣ Tạo câu hỏi trước
      const questionCreated = await Question.create(
        {
          content: questionData.content,
          examId,
          score: questionData.score,
        },
        { transaction: transactionQA }
      );

      // 2️⃣ Tạo đáp án
      const answersCreated = [];
      for (const answerData of questionData.answers) {
        const created = await Answer.create(
          {
            questionId: questionCreated.id,
            content: answerData.content,
          },
          { transaction: transactionQA }
        );
        answersCreated.push(created);
      }

      // 3️⃣ Gán correctAnswerIndex (lưu ID của đáp án đúng)
      const correctAnswer =
        answersCreated[questionData.correctAnswerIndex - 1];
      if (correctAnswer) {
        questionCreated.correctAnswerIndex = correctAnswer.id;
        await questionCreated.save({ transaction: transactionQA });
      }
    }

    // 4️⃣ Cập nhật thời gian cập nhật của Exam (đúng field là updatedAt)
    await Exam.update(
      { updatedAt: new Date() },
      { where: { id: examId }, transaction: transactionQA }
    );

    // 5️⃣ Commit transaction
    await transactionQA.commit();

    return { message: "Thêm câu hỏi và đáp án thành công" };
  } catch (error) {
    await transactionQA.rollback();
    throw new Error(error.message);
  }
};

const getExamsByClassId = async (classId) => {
    try {
        const exams = await ExamTest.findAll({
            where: { classId },
            attributes: ["id", "title", "duration", "quantityQuestion", "createdAt"],
            order: [["createdAt", "DESC"]],
        });

        return exams;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getExamDetailForTeacher = async (examId) => {
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

const getExamDetailForStudent = async (examId) => {
  try {
    const exam = await ExamTest.findByPk(examId, {
      attributes: ["id", "title", "duration"],
      include: [
        {
          model: Question,
          attributes: ["id", "content", "score"],
          include: [
            {
              model: Answer,
              attributes: ["id", "content"],
            },
          ],
        },
      ],
    });

    if (!exam) throw new Error("Không tìm thấy đề thi");

    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};


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

module.exports = { createExam, addQuestionAndAnswersToExam, getExamDetailForTeacher, getExamDetailForStudent, submitExam, getExamResultsByUser, getExamsByClassId };


