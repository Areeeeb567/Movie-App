// backend/src/routes/protected.ts
import express from 'express';
import authMiddleware from '../middleware/auth';
import User from '../models/User';
import {ERROR_MESSAGES, HTTP_STATUS} from "../constants/httpResponses";

const router = express.Router();

// This route is protected by the authMiddleware
router.get('/', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

// Dashboard route to get user information
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById((req as any).user.id).select('-password');
        res.json({
            message: 'Welcome to your dashboard!',
            user
        });
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
});

export default router;
