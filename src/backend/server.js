import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articlesRouter from './routes/articles.js';
import { connectDB } from './config/db.js'; // Corrected the import path
import cors from 'cors';
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// AWS S3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: process.env.MY_AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

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

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Reviews file path
const reviewsFilePath = path.join(__dirname, '../app/api/reviews.json');

// Get reviews
app.get('/api/reviews', (req, res) => {
    fs.readFile(reviewsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading reviews:', err);
            return res.status(500).send('Internal server error');
        }
        res.send(JSON.parse(data));
    });
});

// Add a review with image upload
app.post('/api/reviews', upload.single('image'), (req, res) => {
    const newReview = req.body;
    const file = req.file;

    if (file) {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(500).send('Internal server error');
            }

            newReview.imageUrl = data.Location;
            saveReview(newReview, res);
        });
    } else {
        saveReview(newReview, res);
    }
});

// Image upload endpoint
app.post('/upload-image', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).send('Internal server error');
        }

        res.status(200).send({ url: data.Location });
    });
});

function saveReview(newReview, res) {
    fs.readFile(reviewsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading reviews:', err);
            return res.status(500).send('Internal server error');
        }
        const reviews = JSON.parse(data);
        reviews.push(newReview);
        fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                console.error('Error saving review:', err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send(newReview);
        });
    });
}

// Use the articles router
app.use('/api/articles', articlesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});