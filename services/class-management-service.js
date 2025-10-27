const Class = require("../model/Class");
const User = require("../model/User");

const getAllClasses = async () => {
  try {
    const classes = await Class.findAll({
      include: {
        model: User,
        as: "teacher",
        attributes: ["id", "username", "email"],
      },
      order: [["id", "ASC"]],
    });

    return { data: classes };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClassById = async (classId) => {
  try {
    const classData = await Class.findByPk(classId, {
      include: {
        model: User,
        as: "teacher",
        attributes: ["id", "username", "email"],
      },
    });

    if (!classData) throw new Error("Không tìm thấy lớp học");

    return { data: classData };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateClass = async (classId, name, teacherId) => {
  try {
    const classData = await Class.findByPk(classId);
    if (!classData) throw new Error("Không tìm thấy lớp học");

    if (teacherId) {
      const teacher = await User.findByPk(teacherId);
      if (!teacher || teacher.role !== "teacher") {
        throw new Error("Giáo viên không hợp lệ");
      }
    }

    await classData.update({ className: name, teacherId });
    return { message: "Cập nhật lớp học thành công" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteClass = async (classId) => {
  try {
    const deleted = await Class.destroy({ where: { id: classId } });
    if (!deleted) throw new Error("Không tìm thấy lớp học để xóa");
    return { message: "Xóa lớp học thành công" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports={ getAllClasses, getClassById, updateClass, deleteClass};
