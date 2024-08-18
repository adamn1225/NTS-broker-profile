import { createUsersTable } from './users.js';
import { createFormSubmissionsTable } from './formSubmissions.js';

const createTables = async () => {
    await createUsersTable();
    await createFormSubmissionsTable();
};

// Call the createTables function to ensure tables are created
createTables().catch(error => {
    console.error("Error initializing the database", error);
});