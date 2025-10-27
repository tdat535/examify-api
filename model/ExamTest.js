const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const Class = require("./Class");

const ExamTest = setupSequelize.define('examTest', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantityQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
});

Class.hasMany(ExamTest, { foreignKey: 'classId'});
ExamTest.belongsTo(Class, { foreignKey: 'classId'});

module.exports = ExamTest;