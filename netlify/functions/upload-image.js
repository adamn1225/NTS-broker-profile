import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: process.env.MY_AWS_REGION,
});

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { file, fileName, fileType } = body;

        const buffer = Buffer.from(file, 'base64');
        const key = `${uuidv4()}-${fileName}`;

        const params = {
            Bucket: process.env.MY_AWS_S3_BUCKET_NAME, // Ensure this environment variable is set
            Key: key,
            Body: buffer,
            ContentType: fileType,
        };

        const data = await s3.upload(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ url: data.Location }),
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            statusCode: 500,
            body: `Internal Server Error: ${error.message}`,
        };
    }
};