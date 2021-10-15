const server = require("./server");
const request = require("supertest");
const db = require("./../data/dbConfig");

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("[POST] /register", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .post("/api/auth/register")
      .send({ username: "pincess_serenity", password: "fairies" });
  });

  it("responds with a 201 created", async () => {
    expect(res.status).toBe(201);
  });

  it("causes a user to be added to the db", async () => {
    const users = await db("users");
    expect(users).toHaveLength(1);
  });

  it("responds with newly created user", async () => {
    expect(res.body).toMatchObject({ id: 1, username: "pincess_serenity" });
  });
});

describe("[POST] /login", () => {
  let res
  beforeEach(async() => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: "sailor_helios", password: "12345" })

    res = await request(server)
      .post('/api/auth/login')
      .send({ username: "sailor_helios", password: "12345" })
  })
  
  it("responds with a status 200", async() => {
    expect(res.status).toBe(200)
  });
  it("has a message", async() => {
    expect(res.body.message).toBe('welcome, sailor_helios')
  });
  it("has a token", async() => {
    expect(res.body.token).toBeDefined();
  });
});
