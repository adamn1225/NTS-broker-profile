import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
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
  const { firstName, lastName, phone_number, email, password } = await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user to the database with the hashed password
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO brokers (first_name, last_name, phone_number, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [firstName, lastName, phone_number, email, hashedPassword];
      const result = await client.query(query, values);
      const broker = result.rows[0];
      return NextResponse.json({ message: 'Broker registered successfully', broker }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error registering broker:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM brokers;';
      const result = await client.query(query);
      const brokers = result.rows;
      return NextResponse.json(brokers, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching brokers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}