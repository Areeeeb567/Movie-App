// backend/src/routes/protected.ts
import express from 'express';
import authMiddleware from '../middleware/auth';
import User from '../models/User';

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
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
