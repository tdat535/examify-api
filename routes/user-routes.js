const express = require("express");
const routes = express.Router();
const { register, login, socialRegisterOrLogin, refreshToken, editProfile, profile, updateFcmToken} = require("../services/user-services");
const authenticateToken = require("../middleware/authenticate");

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
            status: true,
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
            status: true,
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

routes.post("/social", async (req, res) => {
    try {
        const { name, email, provider, providerId, roleId } = req.body;
        const result = await socialRegisterOrLogin({ name, email, provider, providerId, roleId });
        res.status(200).json({
            status: true,
            message: "Đăng nhập thành công",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
});

routes.post("/refresh-token", authenticateToken, async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await refreshToken(refreshToken);
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

routes.put("/editProfile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profileData = req.body;
        const result = await editProfile(userId, profileData);
        res.status(200).send({
            status: true,
            message: "Cập nhật thông tin người dùng thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

routes.get("/profile", authenticateToken, async (req, res) => {
    try {
        const teacherId = req.user.id;
        console.log(teacherId);
        const result = await profile(teacherId);
        res.status(200).send({
            status: true,
            message: "Lấy thông tin người dùng thành công",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

routes.post("/update-fcm-token", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { fcmToken } = req.body
        const result = await updateFcmToken(userId, fcmToken)
        res.status(200).send({
            status: true,
            message: "Cập nhật FCM token thành công",
            data: result
        });
    }   
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});


module.exports = routes;