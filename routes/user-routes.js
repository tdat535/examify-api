const express = require("express");
const routes = express.Router();
const { register, login } = require("../services/user-services");

routes.post("/register", async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            roleId: req.body.roleId,            
        }

        const result = await register(userData);

        res.status(200).send({
            status:true,
            message: "Đăng ký thành công",
            data: result
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})

routes.post("/login", async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password,
        }

        const result = await login(userData);
        
        res.status(200).json({
            status:true,
            message: "Đăng nhập thành công",
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

routes.post("/refresh-token", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await refreshAccessToken(refreshToken);
        res.status(200).send({
            status: true,   
            message: "Làm mới token thành cônggg",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

module.exports = routes;