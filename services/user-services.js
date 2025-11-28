const User = require("../model/User");
const Role = require("../model/Role");
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

const socialRegisterOrLogin = async ({ name, email, provider, providerId, roleId }) => {
    try {
        // Kiểm tra xem user đã tồn tại với provider này chưa
        let user = await User.findOne({ where: { email, provider } });

        if (!user) {
            // Nếu chưa có, tạo mới
            user = await User.create({
                username: name,
                email,
                roleId: roleId,
                provider,
                providerId
            });
        }

        return {
            username: user.username,
            email: user.email,
            accessToken: GenerateAccessToken(user),
            refreshToken: GenerateRefreshToken(user)
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

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
        { id: user.id, role: user.roleId, username: user.username, realName: user.realName },
        process.env.ACCESS_KEY,
        { expiresIn: '1d' }
    )
}

const GenerateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.roleId, username: user.username, realName: user.realName },
        process.env.REFRESH_KEY,
        { expiresIn: '365d' }
    )
}

const editProfile = async (userId, profileData) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // Chỉ cho phép cập nhật các field được phép (tránh user sửa role, password...)
    const allowedFields = ["realName", "phone", "email"];
    const safeData = Object.fromEntries(
      Object.entries(profileData).filter(([key]) => allowedFields.includes(key))
    );

    await user.update(safeData);

    return {
      message: "Cập nhật thông tin cá nhân thành công",
      user: {
        id: user.id,
        username: user.username,
        realName: user.realName,
        email: user.email,
        phone: user.phone,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const profile = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'realName', 'phone'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }
    });

    if (!user) throw new Error("Người dùng không tồn tại");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

const updateFcmToken = async (userId, fcmToken) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    user.fcmToken = fcmToken;
    await user.save();
    return {
        message: "Cập nhật FCM token thành công",
        fcmToken: user.fcmToken
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { register, login, socialRegisterOrLogin, refreshToken, editProfile, profile, updateFcmToken };