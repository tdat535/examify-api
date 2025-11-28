const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const User = require("./User");
const Class = require("./Class");

const ClassStudent = setupSequelize.define('classStudent', {
    classId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
});

// Quan hệ giữa ClassStudent và User
ClassStudent.belongsTo(User, { foreignKey: 'studentId' });
User.hasMany(ClassStudent, { foreignKey: 'studentId' });

// Quan hệ giữa ClassStudent và Class
ClassStudent.belongsTo(Class, { foreignKey: 'classId' });
Class.hasMany(ClassStudent, { foreignKey: 'classId' });

// Quan hệ nhiều-nhiều
User.belongsToMany(Class, { through: ClassStudent, foreignKey: 'studentId', as: 'joinedClasses' });
Class.belongsToMany(User, { through: ClassStudent, foreignKey: 'classId', as: 'students' });

module.exports = ClassStudent;


module.exports = ClassStudent;