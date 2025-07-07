const { base, tables } = require('../config/airtable');

async function setupTestData() {
    try {
        // Clear existing data
        const users = await base(tables.USERS).select().firstPage();
        for (const user of users) {
            await base(tables.USERS).destroy(user.id);
        }

        const students = await base(tables.STUDENTS).select().firstPage();
        for (const student of students) {
            await base(tables.STUDENTS).destroy(student.id);
        }

        // Create test admin
        await base(tables.USERS).create({
            Username: 'testadmin',
            Password: 'testpassword123',
            Role: 'admin',
            Status: 'active'
        });

        // Create test educator
        await base(tables.USERS).create({
            Username: 'educator1',
            Password: 'defaultPassword123',
            Role: 'educator',
            Status: 'active'
        });

        console.log('Test data setup complete');
    } catch (error) {
        console.error('Error setting up test data:', error);
        throw error;
    }
}

module.exports = setupTestData; 