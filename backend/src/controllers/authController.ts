const jwt = require('jsonwebtoken');

const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
