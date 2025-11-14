const request = require('supertest');
const app = require('../app');

describe('Health route', () => {
  it('GET / should return ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
