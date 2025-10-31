const User = require("../model/User.js");
const Role = require("../model/Role.js");
const Class = require("../model/Class.js");
const ExamTest = require("../model/ExamTest.js");

const getDashboardByTeacher = async (teacherId) => {
  try {
    // Kiểm tra có phải giáo viên hợp lệ không
    const teacher = await User.findByPk(teacherId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!teacher || teacher.role.name !== "teacher") {
      throw new Error("Tài khoản không hợp lệ hoặc không phải giáo viên");
    }

    // Lấy tổng số lớp của giáo viên này
    const totalClasses = await Class.count({ where: { teacherId } });

    // Lấy danh sách lớp của giáo viên
    const classList = await Class.findAll({ where: { teacherId } });
    const classIds = classList.map((c) => c.id);

    // Lấy tổng số bài thi thuộc các lớp đó
    const totalExams = await ExamTest.count({
      where: { classId: classIds },
    });

    return {
      teacherName: teacher.realName || teacher.username,
      totalClasses,
      totalExams,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRecentClassesByTeacher = async (teacherId) => {
  try {
    const classes = await Class.findAll({
      where: { teacherId },
      order: [["createdAt", "DESC"]],
      limit: 3,
      attributes: ["id", "className", "classCode", "createdAt"],
    });
    return classes;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getDashboardByTeacher, getRecentClassesByTeacher } 