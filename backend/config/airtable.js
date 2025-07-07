const Airtable = require('airtable');

// Configure Airtable
Airtable.configure({ apiKey: process.env.AIRTABLE_PAT });

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT })
               .base(process.env.AIRTABLE_BASE_ID);

// Define table names
const tables = {
    USERS: 'Users',
    STUDENTS: 'Students',
    // Add other table names as needed
};

module.exports = {
    base,
    tables
}; 