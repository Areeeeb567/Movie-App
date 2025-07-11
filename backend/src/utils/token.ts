import jwt from 'jsonwebtoken';

//  Generate JWT tokens for user authentication
//  Expiry Set to 15 minutes for access tokens and 7 days for refresh tokens
export const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    });
};
