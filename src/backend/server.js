import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles.js';
import { connectDB, query } from './config/db.js'; // Corrected the import path

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Login route
const storedHash = process.env.NOAH_PASSWORD;

app.post('/api/login', (req, res) => {
    const { password } = req.body;

    bcrypt.compare(password, storedHash, (err, result) => {
        if (err) {
            console.error('Error comparing password:', err);
            return res.status(500).send('Internal server error');
        }

        if (result) {
            return res.status(200).send('Login successful');
        } else {
            return res.status(401).send('Invalid password');
        }
    });
});

// Use the articles router
app.use('/api/articles', articlesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});