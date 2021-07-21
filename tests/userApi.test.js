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

describe('GET /api/user ', () => {
  test('responds with a json object that contains the selected user', async () => {
    await api
      .get('/api/user?userid=1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Not Found if the user does not exist', async () => {
    await api
      .get('/api/user?userid=100')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a bad queryparam', async () => {
    await api
      .get('/api/user?userId=1')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});

describe('POST /api/user ', () => {
  test('responds with a json object that contains the message "User has been created successfully"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({
        "username": "Federico",
        "age": 31
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "name"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({
        "name": "Federico",
        "age": 31
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Age"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({
        "username": "Federico",
        "Age": 31
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});

describe('PUT /api/user ', () => {
  test('responds with a json object that contains the message "User has been created successfully"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .send({
        "userid": 6,
        "username": "Federico",
        "age": 31
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "name', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .send({
        "userid": 6,
        "name": "Federico",
        "age": 31
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Age"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .send({
        "userid": 6,
        "username": "Federico",
        "Age": 31
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "userId"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .send({
        "userId": 6,
        "username": "Federico",
        "age": 31
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});

describe('DELETE /api/user ', () => {
  test('responds with a json object that contains "User has been deleted successfully"', async () => {
    await api
      .delete('/api/user?userid=6')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Not Found if the user does not exist', async () => {
    await api
      .delete('/api/user?userid=6')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a bad queryparam', async () => {
    await api
      .delete('/api/user?userId=6')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});
