import fs from 'fs';
import path from 'path';

// Ensure __dirname and __filename are available
const __filename = path.resolve();
const __dirname = path.dirname(__filename);

export const handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    console.log('__filename:', __filename); // Debugging log
    console.log('__dirname:', __dirname); // Debugging log

    // Adjust the path to point to the correct location of reviews.json
    const reviewsFilePath = path.join(__dirname, 'lead-form/src/app/api/reviews.json');
    console.log('reviewsFilePath:', reviewsFilePath); // Debugging log

    try {
        const data = fs.readFileSync(reviewsFilePath, 'utf8');
        const reviews = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(reviews),
        };
    } catch (err) {
        console.error('Error reading reviews:', err); // Detailed error logging
        return {
            statusCode: 500,
            body: `Internal Server Error: ${err.message}`, // Include error message in response
        };
    }
};