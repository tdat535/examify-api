const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
    try {
        const usernameExists = await User.findOne({ where: { username: userData.username } });
        if (usernameExists) {
            throw new Error("Tài khoản đã tồn tại");
        }

        const emailExists = await User.findOne({ where: { email: userData.email } });
        if (emailExists) {
            throw new Error("Email đã tồn tại");
        }

        const hashpassword = await bcrypt.hash(userData.password, 10);

        const user = await User.create(
            {
                username: userData.username,
                password: hashpassword,
                email: userData.email,
                roleId: userData.roleId,
            }
        );

        return {
            username: user.username,
            email: user.email,
            role: user.roleId,
        };
    }

    catch (error) {
        throw new Error(error.message);
    }
}

const login = async (userData) => {
    try {
        const user = await User.findOne({ where: { username: userData.username } });
        if (!user) {
            throw new Error("Tài khoản không tồn tại");
        }
        const password = await bcrypt.compare(userData.password, user.password);
        if (!password) {
            throw new Error("Mật khẩu không chính xác");
        }

        const accessToken = GenerateAccessToken(user);
        const refToken = GenerateRefreshToken(user);

        return {
            username: user.username,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refToken
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const refreshToken = async (token) => {
    try {
        if (!token) {
            throw new Error("Vui lòng đăng nhập");
        }
        const decoded = jwt.verify(token, process.env.REFRESH_KEY);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }

        const accessToken = GenerateAccessToken(user);
        const refToken = GenerateRefreshToken(user);
        return {
            accessToken: accessToken,
            refreshToken: refToken
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const GenerateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role, username: user.username },
        process.env.ACCESS_KEY,
        { expiresIn: '1d' }
    )
}

const GenerateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role, username: user.username },
        process.env.REFRESH_KEY,
        { expiresIn: '365d' }
    )
}

module.exports = { register, login, refreshToken };