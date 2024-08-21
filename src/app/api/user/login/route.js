import bcrypt from 'bcrypt';
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

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT id, password FROM brokers WHERE email = $1';
      const values = [username];
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
      }

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return NextResponse.json({ token }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database query error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}