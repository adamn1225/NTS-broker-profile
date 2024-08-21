import { query } from '../config/db.js';

export const createBrokersTable = async () => {
    const createBrokersTableQuery = `
        CREATE TABLE IF NOT EXISTS brokers (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone_number VARCHAR(100),
            password VARCHAR(100) NOT NULL,
            token TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await query(createBrokersTableQuery);
        console.log("Brokers table created successfully");
    } catch (error) {
        console.error("Error creating brokers table", error);
    }
};

export const insertBroker = async (firstName, lastName, email, hashedPassword, phone_number) => {
    const query = `
        INSERT INTO brokers (first_name, last_name, email, password, phone_number)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [firstName, lastName, email, hashedPassword, phone_number];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const updateBrokerToken = async (id, token) => {
    const query = `
        UPDATE brokers
        SET token = $1
        WHERE id = $2;
    `;
    const values = [token, id];
    await pool.query(query, values);
};

export const getAllBrokers = async () => {
    const getAllBrokersQuery = `
        SELECT * FROM brokers;
    `;

    try {
        const result = await query(getAllBrokersQuery);
        return result.rows;
    } catch (error) {
        console.error("Error fetching brokers", error);
        throw error;
    }
};

export const updateBrokerProfile = async (id, firstName, lastName, email, phone_number) => {
    const query = `
        UPDATE brokers
        SET first_name = $1, last_name = $2, email = $3, phone_number = $4
        WHERE id = $5
        RETURNING *;
    `;
    const values = [firstName, lastName, email, phone_number, id];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating broker profile", error);
        throw error;
    }
};