const server = require('./server');
const request = require('supertest');
const db = require('./../data/dbConfig');

beforeAll(async() =>{
  await db.migrate.rollback();
  await db.migrate.latest();
})

afterAll(async() => {
  await db.destroy();
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {
  let res
  beforeEach(async() => {
    res = await request(server).post('/auth/register').send({ username: 'pincess_serenity', password: "fairies" })
  })

  it('responds with a 201 created', () => {
    expect(res.status).toBe(201)
  })
  it.todo('causes a user to be added to the db')
  it.todo('responds with newly created user')
})

describe('[POST] /login', () => {
  it.todo('responds with a status 200')
  it.todo('has a message')
  it.todo('has a token')
})