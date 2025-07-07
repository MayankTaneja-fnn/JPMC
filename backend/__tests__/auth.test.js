const request = require('supertest');
const app = require('../server');
let server;

describe('Authentication Endpoints', () => {
    let adminToken;

    beforeAll((done) => {
        server = app.listen(0, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    // Test admin creation
    describe('POST /api/admin/create-initial-admin', () => {
        it('should create an admin user', async () => {
            const res = await request(server)
                .post('/api/admin/create-initial-admin')
                .send({
                    username: 'testadmin',
                    password: 'testpassword123'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Admin created successfully');
        });

        it('should not create admin if one already exists', async () => {
            const res = await request(server)
                .post('/api/admin/create-initial-admin')
                .send({
                    username: 'testadmin2',
                    password: 'testpassword123'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error', 'Admin already exists');
        });
    });

    // Test login
    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testadmin',
                    password: 'testpassword123'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            adminToken = res.body.token;
        });

        it('should fail with incorrect credentials', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testadmin',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid credentials');
        });
    });

    // Test protected routes
    describe('Protected Routes', () => {
        it('should access admin route with valid token', async () => {
            const res = await request(server)
                .post('/api/admin/add-educators')
                .set('Authorization', `Bearer ${adminToken}`)
                .attach('file', Buffer.from('username\neducator1', 'utf-8'), 'educators.csv');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Educators added successfully');
        });

        it('should fail without token', async () => {
            const res = await request(server)
                .post('/api/admin/add-educators')
                .attach('file', Buffer.from('username\neducator1', 'utf-8'), 'educators.csv');
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Access denied. No token provided.');
        });
    });
}); 