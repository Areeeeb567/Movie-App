import express from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to your dashboard!' });
});

export default router;
