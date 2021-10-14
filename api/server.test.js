const server = require('./server');
const request = require('supertest');
const db = require('./../data/dbConfig');


test('sanity', () => {
  expect(true).toBe(true)
})
