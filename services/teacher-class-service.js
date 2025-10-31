const Class = require("../model/Class");
const User = require("../model/User");
const Role = require("../model/Role");
const ClassStudent = require("../model/ClassStudent");

const createClass = async (name, teacherId) => {
  try {
    const { nanoid } = await import('nanoid');

    const teacher = await User.findByPk(teacherId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!teacher || teacher.role.name !== "teacher")
      throw new Error("Giáo viên không hợp lệ");

    const newClass = await Class.create({
      className: name,
      teacherId,
      classCode: nanoid(6).toUpperCase(),
    });

    return {
      id: newClass.id,
      className: newClass.className,
      classCode: newClass.classCode,
      teacherId: newClass.teacherId,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClassesByTeacher = async (teacherId) => {
  try {
    const teacher = await User.findByPk(teacherId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!teacher || teacher.role.name !== "teacher")
      throw new Error("Giáo viên không hợp lệ");

    const classes = await Class.findAll({ where: { teacherId } });
    return classes;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStudentsByClass = async (classId) => {
  try {
    const classData = await Class.findByPk(classId, {
      include: {
        model: User,
        as: "students",
        attributes: ["id", "username", "email"],
        through: { attributes: [] },
      },
    });

    if (!classData) throw new Error("Không tìm thấy lớp học");

    return {
      data: classData.students,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeStudentFromClass = async (classId, studentId) => {
  try {
    const deleted = await ClassStudent.destroy({ where: { classId, studentId } });
    if (!deleted) throw new Error("Không tìm thấy học sinh trong lớp này");
    return {
      message: "Xóa học sinh khỏi lớp thành công"
    };
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { createClass, getClassesByTeacher, getStudentsByClass, removeStudentFromClass };
