import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT current_user', (err, res) => {
    if (err) {
        console.error('Error fetching current user', err);
    } else {
        console.log('Current user:', res.rows[0]);
    }
});

export const query = (text, params) => pool.query(text, params);

const createTables = async () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            phone_number VARCHAR(15) CHECK (phone_number ~ '^[0-9+() -]+$'),
            email VARCHAR(100) UNIQUE NOT NULL,
            freight VARCHAR(100),
            origin VARCHAR(100),
            destination VARCHAR(100),
            shipment_date DATE
        );
    `;

    try {
        await query(createUsersTable);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables', err);
    }
};

// Call the function to create tables
createTables();