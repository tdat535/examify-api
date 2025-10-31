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
        as: "Students",
        attributes: ["id", "username", "email"],
        through: { attributes: [] },
      },
    });

    if (!classData) throw new Error("Không tìm thấy lớp học");

    return {
      data: classData.Students
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

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

const editProfile = async (userId, profileData) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // Chỉ cho phép cập nhật các field được phép (tránh user sửa role, password...)
    const allowedFields = ["realName", "phone", "email"];
    const safeData = Object.fromEntries(
      Object.entries(profileData).filter(([key]) => allowedFields.includes(key))
    );

    await user.update(safeData);

    return {
      message: "Cập nhật thông tin cá nhân thành công",
      user: {
        id: user.id,
        username: user.username,
        realName: user.realName,
        email: user.email,
        phone: user.phone,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const profile = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'realName', 'phone'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }
    });

    if (!user) throw new Error("Người dùng không tồn tại");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { createClass, getClassesByTeacher, getStudentsByClass, removeStudentFromClass, editProfile, profile };
