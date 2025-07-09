// src/routes/auth.ts
import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'your-secret';

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send("User registered");
});

router.post('/login', async (req, res) => {
    // login logic
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user){
        res.status(401).send("Invalid credentials");
        return;
    }

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            res.status(401).send("Invalid credentials");
            return;
        }
    }


    res.send('Logged in');
});
//
export default router;
