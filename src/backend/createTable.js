// createTable.js
import { createFormSubmissionsTable } from './models/formSubmissions.js';

const createTable = async () => {
    try {
        await createFormSubmissionsTable();
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table', error);
    }
};

createTable();