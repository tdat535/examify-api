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

User.belongsToMany(Class, { through: ClassStudent, foreignKey: 'studentId', as: 'JoinedClass' });
Class.belongsToMany(User, { through: ClassStudent, foreignKey: 'classId', as: 'Students' });

module.exports = ClassStudent;