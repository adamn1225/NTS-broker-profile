import { Pool } from 'pg';

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const getBrokerById = async (id) => {
  const result = await pool.query('SELECT * FROM brokers WHERE id = $1', [id]);
  return result.rows[0] || null;
};