import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';

const app = express();
// const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is working!');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//
// mongoose.connect('mongodb://localhost:27017/auth-demo')
//     .then(() => {
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch(err => {
//         console.error("MongoDB connection error:", err);
//     });
