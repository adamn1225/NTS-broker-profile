import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// AWS S3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: process.env.MY_AWS_REGION,
});

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const reviewsFilePath = path.join('/tmp', 'reviews.json');
    console.log('reviewsFilePath:', reviewsFilePath); // Debugging log

    const { name, text, imageUrl } = JSON.parse(event.body);
    const newReview = { name, text, imageUrl };

    // Validate file type
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const fileExtension = imageUrl.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return {
            statusCode: 400,
            body: 'Invalid file type. Only jpg, jpeg, png, and webp are allowed.',
        };
    }

    try {
        // Ensure the directory exists
        const dir = path.dirname(reviewsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Check if the file exists
        if (!fs.existsSync(reviewsFilePath)) {
            fs.writeFileSync(reviewsFilePath, JSON.stringify([]));
        }

        const reviews = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
        reviews.push(newReview);
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify(newReview),
        };
    } catch (error) {
        console.error('Error adding review:', error);
        return {
            statusCode: 500,
            body: `Internal Server Error: ${error.message}`,
        };
    }
};