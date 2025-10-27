const Class = require("../model/Class");
const User = require("../model/User");
const Role = require("../model/Role");
const ClassStudent = require("../model/ClassStudent");

// Học sinh tham gia lớp bằng mã lớp
const joinClassByCode = async (studentId, classCode) => {
  try {
    const classData = await Class.findOne({ where: { classCode } });
    const student = await User.findByPk(studentId, {
      include: [{ model: Role, as: "role" }],
    });
    if (!classData) throw new Error("Mã lớp không hợp lệ");
    if (!student || student.role.name !== "student") throw new Error("Người dùng không phải học sinh");

    const exists = await ClassStudent.findOne({ where: { classId: classData.id, studentId } });
    if (exists) throw new Error("Học sinh đã tham gia lớp này");

    await ClassStudent.create({ classId: classData.id, studentId });
    return { message: `Tham gia lớp "${classData.className}" thành công` };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lấy danh sách lớp học sinh tham gia
const getClassesByStudent = async (studentId) => {
  try {
    const student = await User.findByPk(studentId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!student || student.role.name !== "student") {
      throw new Error("Người dùng không phải học sinh");
    }

    const classes = await student.getJoinedClasses({
      attributes: { exclude: ["teacherId"] }, // 👈 bỏ teacherId
      include: {
        model: User,
        as: "teacher",
        attributes: ["id", "username", "email"],
      },
    });

    return classes;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { joinClassByCode, getClassesByStudent };
