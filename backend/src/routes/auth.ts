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

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).send("Invalid credentials");
//
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).send("Invalid credentials");
//
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });

// export default router;
// import express from 'express';
// const router = express.Router();
//
router.post('/login', async (req, res) => {
    // login logic
    res.send('Logged in');
});
//
export default router;
