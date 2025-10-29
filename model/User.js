const { DataTypes } = require("sequelize");
const { setupSequelize } = require("../Config/database");
const Role = require("./Role");

const User = setupSequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    realName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true
});

Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

module.exports = User;