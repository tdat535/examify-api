const Class = require("../model/Class");
const User = require("../model/User");
const ClassStudent = require("../model/ClassStudent");

const addStudentToClass = async (classId, studentId) => {
    try {
        const classData = await Class.findByPk(classId);
        const student = await User.findByPk(studentId);

        if (!classData) throw new Error("Không tìm thấy lớp học");
        if (!student || student.role !== "student") {
            throw new Error("Tài khoản này không phải học sinh");
        }

        const exists = await ClassStudent.findOne({ where: { classId, studentId } });
        if (exists) throw new Error("Học sinh đã có trong lớp này");

        await ClassStudent.create({ classId, studentId });
        return { status: true, message: "Thêm học sinh vào lớp thành công" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

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

        return { status: true, data: classData.Students };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

const removeStudentFromClass = async (classId, studentId) => {
    try {
        const deleted = await ClassStudent.destroy({ where: { classId, studentId } });
        if (!deleted) throw new Error("Không tìm thấy học sinh trong lớp này");
        return { status: true, message: "Xóa học sinh khỏi lớp thành công" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

module.exports = { addStudentToClass, getStudentsByClass, removeStudentFromClass };
