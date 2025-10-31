const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");

const Role = setupSequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Role;