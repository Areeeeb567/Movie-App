const jwt = require('jsonwebtoken');

/**
 * Generates an access token for the user
 * @param userId
 */
const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

/**
 * Generates a refresh token for the user
 * @param userId
 */
const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
