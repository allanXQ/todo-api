const request = require("supertest");
const app = require("../src/server");
const { User, Todo } = require("../src/models");
const { messages, sequelize } = require("../src/config");
const bcrypt = require("bcrypt");

describe("Todo Controller Integration Tests", () => {
  let authCookie;
  let userId;

  beforeAll(async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  // Create a new user and get an access token before each test
  beforeEach(async () => {
    try {
      const hashedPassword = await bcrypt.hash("ValidPass123!", 10);
      const user = await User.create({
        email: "todo_user@example.com",
        password: hashedPassword,
      });
      userId = user.id;

      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "todo_user@example.com", password: "ValidPass123!" });

      authCookie = loginResponse.headers["set-cookie"][0];
    } catch (error) {
      console.error("Error during user creation and login:", error);
    }
  });

  afterEach(async () => {
    await Todo.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    try {
      await sequelize.close();
    } catch (error) {
      console.error("Error closing the database:", error);
    }
  });

  // Test creating a new Todo
  test("POST /api/v1/todos should create a new todo", async () => {
    const response = await request(app)
      .post("/api/v1/todos/add")
      .set("Cookie", authCookie)
      .send({ title: "Test Todo", description: "Test description" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.createTodoSuccess);
    expect(response.body.data.title).toBe("Test Todo");
  });

  // Test getting a list of Todos
  test("GET /api/v1/todos should return a list of todos", async () => {
    await Todo.create({
      title: "Todo 1",
      description: "Description 1",
      userId,
    });
    await Todo.create({
      title: "Todo 2",
      description: "Description 2",
      userId,
    });

    const response = await request(app)
      .get("/api/v1/todos")
      .set("Cookie", authCookie);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.data)).toBe(true);
    expect(response.body.data.data.length).toBeGreaterThanOrEqual(2);
  });

  // Test updating a Todo
  test("post /api/v1/todos/update should update an existing todo", async () => {
    const todo = await Todo.create({
      title: "Original Todo",
      description: "Original description",
      userId,
    });

    const response = await request(app)
      .post(`/api/v1/todos/update`)
      .set("Cookie", authCookie)
      .send({
        id: todo.id,
        title: "Updated Todo",
        description: "Updated description",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.todoUpdateSuccess);
    expect(response.body.data.title).toBe("Updated Todo");
    expect(response.body.data.description).toBe("Updated description");
  });

  // Test deleting a Todo
  test("post /api/v1/todos/delete should post a todo", async () => {
    const todo = await Todo.create({
      title: "Todo to post",
      description: "Will be deleted",
      userId,
    });

    const response = await request(app)
      .post(`/api/v1/todos/delete`)
      .set("Cookie", authCookie)
      .send({ id: todo.id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.todoDeleteSuccess);
  });

  // Test creating a Todo with a missing title
  test("POST /api/v1/todos should return an error for missing title", async () => {
    const response = await request(app)
      .post("/api/v1/todos/add")
      .set("Cookie", authCookie)
      .send({ description: "No title provided" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.todoTitleRequired);
  });

  // Test updating a non-existent Todo
  test("post /api/v1/todos should return an error for updating a non-existent todo", async () => {
    const response = await request(app)
      .post("/api/v1/todos/update")
      .set("Cookie", authCookie)
      .send({
        id: 9999,
        title: "Updated Title",
        description: "Updated description",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(messages.todoNotFound);
  });

  // Test deleting a non-existent Todo
  test("post /api/v1/todos/delete should return an error for deleting a non-existent todo", async () => {
    const response = await request(app)
      .post("/api/v1/todos/delete")
      .set("Cookie", authCookie)
      .send({ id: 99999 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(messages.todoNotFound);
  });
});
