import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const router = express.Router();

// Middleware to check if the user is authenticated
// Login route will handle user authentication
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //  Incase user is not found or password is incorrect
    if (!user){
        res.status(401).send("Invalid credentials");
        return;
    }

    //  If user is found, compare the password
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            res.status(401).send("Invalid credentials");
            return;
        }
    }

    //  Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // res.send('Logged in');
    res.json({ token: accessToken });

});

//  Register route to create a new user
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

export default router;


