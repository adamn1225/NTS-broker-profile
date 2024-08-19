import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const storedHash = process.env.XP_12_PASSWORD;

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});