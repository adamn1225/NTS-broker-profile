import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    awsAccessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.MY_AWS_REGION,
    awsS3BucketName: process.env.MY_AWS_S3_BUCKET_NAME,
});

export const query = (text, params) => pool.query(text, params);

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error', err.stack);
    }
};