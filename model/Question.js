const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const ExamTest = require("./ExamTest");

const Questions = setupSequelize.define('Question', {
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correctAnswerIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    timestamps: true
});

ExamTest.hasMany(Questions, { foreignKey: "examId" });
Questions.belongsTo(ExamTest, { foreignKey: "examId" });


module.exports = Questions;