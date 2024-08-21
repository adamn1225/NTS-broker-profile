import { query } from '../config/db';

export const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await query(createUsersTableQuery);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table", error);
    }
};