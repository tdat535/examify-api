const Exam = require("../model/ExamTest");
const Question = require("../model/Question");
const Answer = require("../model/Answer");
const ExamTest = require("../model/ExamTest");
const ExamResult = require("../model/ExamResult");
const Class = require("../model/Class");
const ClassStudent = require("../model/ClassStudent");
const User = require("../model/User");
const admin = require("../Config/firebase");

const createExam = async (examData) => {
  try {
    // 1. Tạo bài thi
    const exam = await Exam.create({
      title: examData.title,
      duration: examData.duration,
      quantityQuestion: examData.quantityQuestion || 0,
      classId: examData.classId,
    });

    // 2. Lấy danh sách học sinh trong lớp kèm thông tin tên lớp
    const students = await ClassStudent.findAll({
      where: { classId: exam.classId },
      include: [
        { model: User, attributes: ['id', 'realName', 'username', 'fcmToken'] },
        { model: Class, attributes: ['className'] }
      ]
    });

    // 3. Gửi notification cho từng học sinh
    for (const cs of students) {
      const student = cs.User;
      const className = cs.Class?.className || "Lớp";
      const content = `Bài thi "${exam.title}" đã được tạo trong "${className}".`;

      // Lưu notification vào Firestore
      await admin.firestore().collection('notifications').add({
        userId: student.id.toString(),
        title: 'Bài thi mới',
        content,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Gửi push notification nếu có FCM token
      if (student.fcmToken) {
        await admin.messaging().send({
          token: student.fcmToken,
          notification: {
            title: 'Bài thi mới',
            body: content,
          },
          data: {
            examId: exam.id.toString(),
          },
        });
      }
    }

    return {
      examId: exam.id,
      title: exam.title,
      duration: exam.duration,
      quantityQuestion: exam.quantityQuestion,
      classId: exam.classId,
      createdAt: exam.createdAt,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addQuestionAndAnswersToExam = async (examId, questionList) => {
  const transactionQA = await Question.sequelize.transaction();

  try {
    for (const questionData of questionList) {
      const questionCreated = await Question.create(
        {
          content: questionData.content,
          examId,
        },
        { transaction: transactionQA }
      );

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

      const correctAnswer =
        answersCreated[questionData.correctAnswerIndex - 1];
      if (correctAnswer) {
        questionCreated.correctAnswerIndex = correctAnswer.id;
        await questionCreated.save({ transaction: transactionQA });
      }
    }

    const allQuestions = await Question.findAll({
      where: { examId },
      transaction: transactionQA,
    });

    const totalScore = 10;
    const perQuestionScore = totalScore / allQuestions.length;
    for (const q of allQuestions) {
      q.score = perQuestionScore;
      await q.save({ transaction: transactionQA });
    }

    await Exam.update(
      {
        quantityQuestion: allQuestions.length,
        updatedAt: new Date(),
      },
      { where: { id: examId }, transaction: transactionQA }
    );

    await transactionQA.commit();

    return {
      message: `Thêm câu hỏi thành công — ${allQuestions.length} câu hỏi, tự động chia ${perQuestionScore.toFixed(2)} điểm/câu.`,
    };
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
        {
          model: Class,
          attributes: ["className"], // thêm cái này
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
    // Kiểm tra đã nộp chưa
    const existing = await ExamResult.findOne({ where: { examId, userId: studentId } });
    if (existing && existing.status === 'submitted') {
      throw new Error("Bạn đã nộp bài này rồi");
    }

    const exam = await Exam.findByPk(examId, { include: { model: Question, include: [Answer] } });
    if (!exam) throw new Error("Không tìm thấy đề thi");

    let totalScore = 0;
    for (const question of exam.Questions) {
      const studentAnswer = answers.find(ans => ans.questionId === question.id);
      if (studentAnswer && studentAnswer.answerId === question.correctAnswerIndex) {
        totalScore += question.score;
      }
    }

    let result;
    if (existing) {
      result = await existing.update({ score: totalScore, submitAt: new Date(), status: 'submitted' });
    } else {
      result = await ExamResult.create({ userId: studentId, examId, score: totalScore, status: 'submitted' });
    }

    // Gửi notification
    const student = await User.findByPk(studentId);
    const classInfo = await Class.findByPk(exam.classId, { include: [{ model: User, as: 'teacher' }] });

    if (classInfo && classInfo.teacher) {
      // Teacher FCM token
      const teacherFcmToken = classInfo.teacher.fcmToken;
      if (teacherFcmToken) {
        await admin.messaging().send({
          token: teacherFcmToken,
          notification: {
            title: 'Học sinh đã nộp bài',
            body: `${student?.realName || 'Học sinh'} vừa nộp bài "${exam.title}"`,
          },
          data: {
            examId: exam.id.toString(),
            studentId: student.id.toString(),
          },
        });
      }
    }

    // Student FCM token
    if (student.fcmToken) {
      await admin.messaging().send({
        token: student.fcmToken,
        notification: {
          title: 'Nộp bài thành công',
          body: `Bạn đã nộp bài "${exam.title}" thành công!`,
        },
        data: {
          examId: exam.id.toString(),
        },
      });
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExamResultsByUser = async (userId) => {
  try {
    const results = await ExamResult.findAll({
      where: { userId: userId },
      include: [
        {
          model: ExamTest,
          attributes: ['title'],
          include: [
            {
              model: Class,
              attributes: ['className'] // 👈 Lấy tên lớp
            }
          ]
        }
      ]
    });

    return results;
  }
  catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createExam, addQuestionAndAnswersToExam, getExamDetailForTeacher, getExamDetailForStudent, submitExam, getExamResultsByUser, getExamsByClassId };


