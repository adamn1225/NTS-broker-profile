import { query } from '../config/db.js';

export const createLtlFormTable = async () => {
    const createLtlFormTableQuery = `
        CREATE TABLE IF NOT EXISTS ltl_form (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(100),
            phone_number VARCHAR(15) CHECK (phone_number ~ '^[0-9+() -]+$'),
            shipment_description VARCHAR(255),
            origin VARCHAR(100),
            destination VARCHAR(100),
            weight VARCHAR(50),
            dimensions VARCHAR(100)
        );
    `;

    try {
        await query(createLtlFormTableQuery);
        console.log("LTL form table created successfully");
    } catch (error) {
        console.error("Error creating LTL form table", error);
    }
};

export const insertLtlFormSubmission = async (formSubmission) => {
    const { user_id, phone_number, shipment_description, origin, destination, weight, dimensions, email, first_name, last_name } = formSubmission;
    const queryText = `
        INSERT INTO ltl_form (user_id, phone_number, email, first_name, last_name, shipment_description, origin, destination, weight, dimensions)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [user_id, phone_number, shipment_description, origin, destination, weight, dimensions, email, first_name, last_name];

    try {
        const res = await query(queryText, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error inserting LTL form submission', err);
        throw err;
    }
};

export const getLtlFormSubmissions = async () => {
    const getLtlFormSubmissionsQuery = `
        SELECT * FROM ltl_form;
    `;

    try {
        const res = await query(getLtlFormSubmissionsQuery);
        return res.rows;
    } catch (error) {
        console.error('Error fetching LTL form submissions', error);
        throw error;
    }
};