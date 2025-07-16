import jwt from 'jsonwebtoken';

//  Generate JWT tokens for user authentication
/**
 * Generates an access token for the user
 * @param userId
 */
export const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    });
};

/**
 * Generates a refresh token for the user
 * @param userId
 */
export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    });
};
