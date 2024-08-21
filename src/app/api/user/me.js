import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Assuming the token in the format "Bearer <token>"
  if (!token) {
    return NextResponse.json({ error: 'Token missing' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
    const userId = decoded.id; // Assuming the token contains the user ID in the "id" field

    const client = await pool.connect();
    try {
      const query = 'SELECT id, first_name, last_name, email, phone_number FROM brokers WHERE id = $1';
      const values = [userId];
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const user = result.rows[0];
      return NextResponse.json(user, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error verifying token or fetching user data:', error);
    return NextResponse.json({ error: 'Error verifying token or fetching user data' }, { status: 500 });
  }
}