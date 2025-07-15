// backend/src/routes/protected.ts
import express from 'express';
import authMiddleware from '../middleware/auth';
import User from '../models/User';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse} from "../constants/httpResponses";
import { sendResponse, sendErrorResponse } from '../constants/httpResponses';

const router = express.Router();

/**
 * Protected route to demonstrate authentication
 */
router.get('/', authMiddleware, (req, res) => {
    // res.send('This is a protected route');
    sendErrorResponse(res, HTTP_STATUS.OK, 'This is a protected route');
});

/**
 * Dashboard route to get user information
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById((req as any).user.id).select('-password');
        // res.json({
        //     message: 'Welcome to your dashboard!',
        //     user
        // });
        jsonResponse(res, user);
        // sendResponse(res, HTTP_STATUS.OK, {
        //     message: 'Welcome to your dashboard!',
        //     user
        // });
    } catch (error) {
        // res.status(HTTP_STATUS.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
    }
});

export default router;
