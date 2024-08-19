// utils/initializeDatabase.js
import { query } from '../config/db.js'; // Ensure the correct import path

export const createFormSubmissionsTable = async () => {
    const createFormSubmissionsTableQuery = `
        CREATE TABLE IF NOT EXISTS form_submissions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            phone_number VARCHAR(15) CHECK (phone_number ~ '^[0-9+() -]+$'),
            freight VARCHAR(100),
            origin VARCHAR(100),
            destination VARCHAR(100),
            e_year VARCHAR(4),
            e_make VARCHAR(50),
            e_model VARCHAR(50),
            length VARCHAR(50),
            width VARCHAR(50),
            height VARCHAR(50),
            machine_weight VARCHAR(50)
        );
    `;

    try {
        console.log("Creating form submissions table...");
        await query(createFormSubmissionsTableQuery);
        console.log("Form submissions table created successfully");
    } catch (error) {
        console.error("Error creating form submissions table", error);
    }
};

// Add more functions to create other tables as needed

// Example: createUsersTable
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
        console.log("Creating users table...");
        await query(createUsersTableQuery);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table", error);
    }
};

// Initialize all tables
export const initializeDatabase = async () => {
    console.log("Initializing database...");
    await createUsersTable();
    await createFormSubmissionsTable();
    // Add calls to other table creation functions here
    console.log("Database initialization complete.");
};

// Run the initialization
initializeDatabase().catch(error => {
    console.error("Error initializing database", error);
});