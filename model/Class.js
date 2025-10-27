const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");

const Class = setupSequelize.define('Class', {
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
});


module.exports = Class;