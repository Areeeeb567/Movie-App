// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {ERROR_MESSAGES, HTTP_STATUS } from '../constants/httpResponses';

// Middleware to authenticate requests using JWT
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.NO_TOKEN });
        return;
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.FORBIDDEN).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
};

export default authMiddleware;
