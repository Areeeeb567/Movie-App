import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ This is the correct way to use your router
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/auth-demo')
    .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    });

app.get('/', (req, res) => {
    res.send('API is working!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
