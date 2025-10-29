const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/User'); 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(403).json({ error: 'Invalid token' });
        }

        // Kiểm tra trạng thái tài khoản sau khi giải mã token
        const foundUser = await User.findByPk(user.id);
        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;