import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { verifyToken } from '@utils/userJWT'; // Adjust the path as needed

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

  const token = authHeader.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
  const userId = verifyToken(token);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT first_name, email, phone_number FROM brokers WHERE id = $1';
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
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}