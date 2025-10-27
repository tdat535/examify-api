require('dotenv').config();
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const setupSequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

const connectDB = async () => {
    try {
        await setupSequelize.authenticate();
        console.log('Kết nối database thành công');
    } catch (error) {
        console.error('Kết nối database bị lỗi', error);
    }
};

module.exports = { setupSequelize, connectDB };