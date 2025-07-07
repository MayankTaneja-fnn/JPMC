const request = require('supertest');
const app = require('../server');
let server;

describe('Educator Endpoints', () => {
    let educatorToken;

    beforeAll(async () => {
        server = await new Promise(resolve => {
            const s = app.listen(0, () => resolve(s));
        });
        
        // First login to get token
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'educator1',
                password: 'defaultPassword123'
            });
        educatorToken = res.body.token;
    });

    afterAll(async () => {
        await new Promise(resolve => server.close(resolve));
    });

    describe('POST /api/educator/add-students', () => {
        it('should add students with valid CSV', async () => {
            const res = await request(server)
                .post('/api/educator/add-students')
                .set('Authorization', `Bearer ${educatorToken}`)
                .attach('file', Buffer.from('Name,Phone\nJohn Doe,918779171731', 'utf-8'), 'students.csv');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Students added successfully');
        });

        it('should fail without required CSV fields', async () => {
            const res = await request(server)
                .post('/api/educator/add-students')
                .set('Authorization', `Bearer ${educatorToken}`)
                .attach('file', Buffer.from('Name\nJohn Doe', 'utf-8'), 'students.csv');
            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /api/student/profile/:id', () => {
        it('should get student profile', async () => {
            // First get a student ID from the database
            const res = await request(server)
                .get('/api/student/profile/STUDENT_ID_HERE')
                .set('Authorization', `Bearer ${educatorToken}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('Name');
            expect(res.body).toHaveProperty('Phone');
        });

        it('should fail with invalid student ID', async () => {
            const res = await request(server)
                .get('/api/student/profile/invalid_id')
                .set('Authorization', `Bearer ${educatorToken}`);
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Student not found');
        });
    });
}); 