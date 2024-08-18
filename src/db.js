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
            shipment_date DATE,
            e_year VARCHAR(4),
            e_make VARCHAR(50),
            e_model VARCHAR(50),
            length VARCHAR(50),
            width VARCHAR(50),
            height VARCHAR(50),
            machine_weight VARCHAR(50),
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

export const insertUser = async (user) => {
    const { first_name, last_name, phone_number, email, freight, origin, destination, shipment_date } = user;
    const text = `
        INSERT INTO users (first_name, last_name, phone_number, email, freight, origin, destination, shipment_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const values = [first_name, last_name, phone_number, email, freight, origin, destination, shipment_date];
    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
};