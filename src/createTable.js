// createTable.js
import { createFormSubmissionsTable } from './model/formSubmissions.js';

const createTable = async () => {
    try {
        await createFormSubmissionsTable();
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table', error);
    }
};

createTable();