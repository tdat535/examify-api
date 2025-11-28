const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const User = require("./User");
const Exam = require("./ExamTest");

const ExamResult = setupSequelize.define('examResult', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    submitAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('not_started', 'submitted'),
        defaultValue: 'not_started',
    }
});

User.hasMany(ExamResult, { foreignKey: 'userId' });
ExamResult.belongsTo(User, { foreignKey: 'userId' });

Exam.hasMany(ExamResult, { foreignKey: 'examId' });
ExamResult.belongsTo(Exam, { foreignKey: 'examId' });

module.exports = ExamResult;