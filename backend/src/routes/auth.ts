import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const router = express.Router();


router.post('/login', async (req, res) => {
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


    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // res.send('Logged in');
    res.json({ token: accessToken });

});

export default router;



// import express from 'express';
// import User from '../models/User';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { generateAccessToken, generateRefreshToken } from '../utils/token';
//
//
// const router = express.Router();
// const JWT_SECRET = 'your-secret';
//
// backend/src/routes/auth.ts (update register route)
router.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = new User({ username, email, phoneNumber, password });
        await user.save();
        res.status(201).send("User registered");
    } catch (error) {
        res.status(400).send("Registration failed");
    }
});
//
// router.post('/login', async (req, res) => {
//     // login logic
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user){
//         res.status(401).send("Invalid credentials");
//         return;
//     }
//
//     if (user) {
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch){
//             res.status(401).send("Invalid credentials");
//             return;
//         }
//     }
//
//
//     res.send('Logged in');
// });
//
// export default router;
