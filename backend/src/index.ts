import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import protectedRoutes from './routes/protected';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cookieParser());
app.use('/api', protectedRoutes);

// Basic route to check if the API is working
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
