import { query } from '../config/db.js'; // Ensure the correct import path

export const createBrokersTable = async () => {
    const createBrokersTableQuery = `
        CREATE TABLE IF NOT EXISTS brokers (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            phone_number VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        console.log("Creating brokers table...");
        await query(createBrokersTableQuery);
        console.log("Brokers table created successfully");
    } catch (error) {
        console.error("Error creating brokers table", error);
    }
};

export const addPhoneNumberColumn = async () => {
    const checkColumnExistsQuery = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name='brokers' AND column_name='phone_number';
    `;

    try {
        const result = await query(checkColumnExistsQuery);
        if (result.rows.length === 0) {
            const addPhoneNumberColumnQuery = `
                ALTER TABLE brokers
                ADD COLUMN phone_number VARCHAR(100);
            `;
            console.log("Adding phone_number column to brokers table...");
            await query(addPhoneNumberColumnQuery);
            console.log("phone_number column added successfully");
        } else {
            console.log("phone_number column already exists in brokers table");
        }
    } catch (error) {
        console.error("Error adding phone_number column", error);
    }
};

export const createFormSubmissionsTable = async () => {
    const createFormSubmissionsTableQuery = `
        CREATE TABLE IF NOT EXISTS form_submissions (
            id SERIAL PRIMARY KEY,
            form_data JSONB NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        console.log("Creating form_submissions table...");
        await query(createFormSubmissionsTableQuery);
        console.log("Form submissions table created successfully");
    } catch (error) {
        console.error("Error creating form submissions table", error);
    }
};

// Call the functions to initialize the database
(async () => {
    await createBrokersTable();
    await addPhoneNumberColumn();
    await createFormSubmissionsTable();
})();