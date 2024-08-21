import { query } from '../config/db.js';

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
        await query(createFormSubmissionsTableQuery);
        console.log("Form submissions table created successfully");
    } catch (error) {
        console.error("Error creating form submissions table", error);
    }
};

export const insertFormSubmission = async (formSubmission) => {
    const { user_id, phone_number, freight, origin, destination, e_year, e_make, e_model, length, width, height, machine_weight } = formSubmission;
    const queryText = `
        INSERT INTO form_submissions (user_id, phone_number, freight, origin, destination, e_year, e_make, e_model, length, width, height, machine_weight)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
    `;
    const values = [user_id, phone_number, freight, origin, destination, e_year, e_make, e_model, length, width, height, machine_weight];

    try {
        const res = await query(queryText, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error inserting form submission', err);
        throw err;
    }
};

export const getFormSubmissions = async () => {
    const getFormSubmissionsQuery = `
        SELECT * FROM form_submissions;
    `;

    try {
        const res = await query(getFormSubmissionsQuery);
        return res.rows;
    } catch (error) {
        console.error('Error fetching form submissions', error);
        throw error;
    }
};