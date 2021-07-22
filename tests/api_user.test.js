const request = require('supertest');
const app   = require('../src/app')
const base64 = require('base-64');
const logger = require('../src/utils/logger');

const api = request(app);
const usr = process.env.USERNAME_AUTH;
const pwd = process.env.PASSWORD_AUTH;
const buf = base64.encode(usr + ":" + pwd)

describe('GET /api/users ', () => {
  test('responds with a json object that contains a list users', async () => {
    await api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Unauthorized bad username', async () => {
    await api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + base64.encode(`jorgestivenm@hotmail.com:${pwd}`))
      .expect(401)
  });

  test('responds Unauthorized bad password', async () => {
    await api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + base64.encode(`${usr}:ASDFr1235`))
      .expect(401)
  });

});


describe('GET /api/user ', () => {
  test('responds with a json object that contains the selected user', async () => {
    await api
      .get('/api/user?userid=1')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Not Found if the user does not exist', async () => {
    await api
      .get('/api/user?userid=100')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a bad queryparam "userId"', async () => {
    await api
      .get('/api/user?userId=1')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});


describe('POST /api/user ', () => {
  test('responds with a json object that contains the message "User has been created successfully"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "username": "johnny Smith",
        "age": 31,
        "password": "Admin12345",
        "email": "jhonny.smith@example.com"
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('responds with a json object that contains the message "There is another user with the same email"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "username": "johnny Smith",
        "age": 31,
        "password": "Admin12345",
        "email": "jhonny.smith@example.com"
      })
      .expect(409)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "name"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "name": "Federico",
        "age": 31,
        "password": "Admin12345",
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Age"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "username": "Federico",
        "Age": 31,
        "password": "Admin12345",
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Password"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "username": "Federico",
        "age": 31,
        "Password": "Admin12345",
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Email"', async () => {
    await api
      .post('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "username": "Federico",
        "age": 31,
        "password": "Admin12345",
        "Email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

});


describe('PUT /api/user ', () => {
  test('responds with a json object that contains the message "User has been updated successfully"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "userid": 2,
        "username": "Johnny Federico",
        "age": 32,
        "email": "jhonny.smith@example.com"
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "name', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "userid": 2,
        "name": "Johnny Federico",
        "age": 32,
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "Age"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "userid": 2,
        "username": "Johnny Federico",
        "Age": 32,
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a malformed body "userId"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "userId": 2,
        "username": "Johnny Federico",
        "age": 3,
        "email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
  test('responds Bad Request sending a malformed body "Email"', async () => {
    await api
      .put('/api/user')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .send({
        "userId": 2,
        "username": "Johnny Federico",
        "age": 32,
        "Email": "jhonny.smith@example.com"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});


describe('DELETE /api/user ', () => {
  test('responds with a json object that contains "User has been deleted successfully"', async () => {
    await api
      .delete('/api/user?userid=2')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Not Found if the user does not exist', async () => {
    await api
      .delete('/api/user?userid=100')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  });

  test('responds Bad Request sending a bad queryparam', async () => {
    await api
      .delete('/api/user?userId=2')
      .set('Accept', 'application/json')
      .set("Authorization", "basic " + buf)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  });
});