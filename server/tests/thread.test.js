const request = require("supertest");
const mongoose = require("mongoose");
const Thread = require("../api/models/thread");
const User = require("../api/models/user");
const app = require("../app");

const userOne = {
  username: "random_user",
  password: "randompassword"
};

const threadOne = {
  _id: new mongoose.Types.ObjectId(),
  title: "test title",
  body: "test body"
};

var token = "";

beforeAll(async () => {
  await Thread.deleteMany();
  await User.deleteMany();
});

test("should register a user", async () => {
  await request(app)
    .post("/api/register")
    .send(userOne)
    .expect(201);
});

test("shold login a user", async () => {
  const response = await request(app)
    .post("/api/login")
    .send(userOne)
    .expect(200);
  token = response.body.token;
  expect(token.length).toBeGreaterThanOrEqual(1);
});

test("should add a thread", async () => {
  const response = await request(app)
    .post("/api/thread/create")
    .set("Authorization", token)
    .send(threadOne)
    .expect(201);
});

test("should fetch threads", async () => {
  const response = await request(app)
    .get("/api/threads/all")
    .set("Authorization", token)
    .expect(200);

  expect(response.body.length).toEqual(1);
});

test("should update a thread", async () => {
  const response = await request(app)
    .put("/api/thread/update")
    .send({
      title: "updated title",
      body: "updated body",
      _id: threadOne._id
    })
    .set("Authorization", token)
    .expect(200);
  expect(response.body.success).toEqual(true);
});

test("should delete a thread", async () => {
  const response = await request(app)
    .delete("/api/thread/delete")
    .send({
      _id: threadOne._id
    })
    .set("Authorization", token)
    .expect(200);

  expect(response.body.success).toEqual(true);
});
