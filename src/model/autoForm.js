import { query } from '../config/db.js';

export const createAutoFormTable = async () => {
    const createAutoFormTableQuery = `
        CREATE TABLE IF NOT EXISTS auto_form (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            phone_number VARCHAR(15) CHECK (phone_number ~ '^[0-9+() -]+$'),
            email VARCHAR(100),
            vehicle_make VARCHAR(50),
            vehicle_model VARCHAR(50),
            vehicle_year VARCHAR(4),
            origin VARCHAR(100),
            destination VARCHAR(100)
        );
    `;

    try {
        await query(createAutoFormTableQuery);
        console.log("Auto form table created successfully");
    } catch (error) {
        console.error("Error creating auto form table", error);
    }
};

export const insertAutoFormSubmission = async (formSubmission) => {
    const { user_id, phone_number, vehicle_make, vehicle_model, vehicle_year, origin, destination, email, first_name, last_name } = formSubmission;
    const queryText = `
        INSERT INTO auto_form (user_id, phone_number, vehicle_make, vehicle_model, vehicle_year, origin, destination, email, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [user_id, phone_number, vehicle_make, vehicle_model, vehicle_year, origin, destination, email, first_name, last_name];

    try {
        const res = await query(queryText, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error inserting auto form submission', err);
        throw err;
    }
};

export const getAutoFormSubmissions = async () => {
    const getAutoFormSubmissionsQuery = `
        SELECT * FROM auto_form;
    `;

    try {
        const res = await query(getAutoFormSubmissionsQuery);
        return res.rows;
    } catch (error) {
        console.error('Error fetching auto form submissions', error);
        throw error;
    }
};