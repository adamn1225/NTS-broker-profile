import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const verifyConnection = async () => {
    const query = `
        SELECT current_database(), current_schema();
    `;
    try {
        const res = await client.query(query);
        console.log('Connected to database:', res.rows[0].current_database);
        console.log('Using schema:', res.rows[0].current_schema);
    } catch (error) {
        console.error('Error verifying connection:', error);
    }
};

export const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public.users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE
        );
    `;
    try {
        console.log('Executing query:', query);
        await client.query(query);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

const checkTableExists = async () => {
    const query = `
        SELECT to_regclass('public.users') AS table_exists;
    `;
    try {
        const res = await client.query(query);
        if (res.rows[0].table_exists) {
            console.log('Users table exists');
        } else {
            console.log('Users table does not exist');
        }
    } catch (error) {
        console.error('Error checking if users table exists:', error);
    }
};

verifyConnection();
createUsersTable();
checkTableExists();