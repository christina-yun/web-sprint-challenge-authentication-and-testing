const server = require('./server');
const request = require('supertest');
const db = require('./../data/dbConfig');

beforeEach(async() =>{
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
    res = await request(server).post('/api/auth/register').send({ username: 'pincess_serenity', password: "fairies" })
  })

  it('responds with a 201 created', async () => {
    expect(res.status).toBe(201)
  })

  it('causes a user to be added to the db', async () => {
    const users = await db('users');
    expect(users).toHaveLength(1)
  })

  it('responds with newly created user', async () => {
    expect(res.body).toMatchSnapshot();
  })
})

describe('[POST] /login', () => {
  it.todo('responds with a status 200')
  it.todo('has a message')
  it.todo('has a token')
})