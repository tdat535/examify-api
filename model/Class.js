const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const User = require("./User");

const Class = setupSequelize.define('Class', {
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
});

Class.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

module.exports = Class;