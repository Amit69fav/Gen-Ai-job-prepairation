const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.GOOGLE_GENAI_API_KEY = 'dummy-key';
const app = require('../src/app');
const userModel = require('../src/models/user.model');

let mongoServer;

describe('Authentication & Session Tests', () => {
    beforeAll(async () => {
        // Disconnect if already connected (from app.js)
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        process.env.JWT_SECRET = 'test-secret';
    });

    afterAll(async () => {
        await userModel.deleteMany({});
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    describe('Registration boundaries', () => {
        test('Should fail with malformed email', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'invalid-email',
                    password: 'Password123!'
                });
            expect(res.status).toBe(400);
        });

        test('Should fail with weak password', async () => {
            // Assuming we add password strength validation
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: '123'
                });
            expect(res.status).toBe(400);
        });

        test('Should prevent duplicate email registration', async () => {
            await userModel.create({
                username: 'existing',
                email: 'duplicate@example.com',
                password: 'hashedpassword'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'newuser',
                    email: 'duplicate@example.com',
                    password: 'Password123!'
                });
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/exists/i);
        });
    });

    describe('Route Protection & Session', () => {
        test('Should deny access to Interview page without token', async () => {
            const res = await request(app).post('/api/interview/').send({});
            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/login/i);
        });

        test('Should deny access with blacklisted token', async () => {
            // 1. Login to get token
            // 2. Logout to blacklist token
            // 3. Try to access protected route
            // Implementation depends on cookie handling in supertest
        });
    });
});
