const { IoTWireless } = require('aws-sdk');
const request = require('supertest');
const app   = require('../src/app')

const api = request(app);

describe('GET /api/users ', () => {
  test('responds with a json object that contains a list users', async () => {
    await api
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
});