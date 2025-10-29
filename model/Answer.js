const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const Questions = require("./Question");

const Answer = setupSequelize.define('Answer', {
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    timestamps: true
});

Questions.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Questions, { foreignKey: "questionId" });


module.exports = Answer;