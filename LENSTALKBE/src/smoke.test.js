import request from 'supertest';
import app from './server.js';
import mongoose from 'mongoose';

describe('Backend Smoke Tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/health should return 200 and success message', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  }, 20000);

  test('GET /api/campaigns should return 200', async () => {
    const res = await request(app).get('/api/campaigns');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/gallery should return 200', async () => {
    const res = await request(app).get('/api/gallery');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/services should return 200', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
  });

  test('POST /api/auth/login with invalid credentials should return 401 or 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });
    
    // Most auth systems return 401 or 400 for bad creds
    expect([400, 401]).toContain(res.statusCode);
  });
});
